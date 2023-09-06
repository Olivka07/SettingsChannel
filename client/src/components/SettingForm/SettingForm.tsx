import React, {useEffect, useState} from 'react';
import {Form, Radio, Input, Button, RadioChangeEvent } from 'antd'
import { channels } from '../../data/data';
import { ButtonType, ChannelType } from '../../models/index';
import ButtonKeyBoard from '../ButtonKeyBoard/ButtonKeyBoard';
import axios from 'axios'


const SettingForm = () => {

    const [form] = Form.useForm();
    const [channel, setChannel] = useState<ChannelType>(null)
    const [keyboardType, setKeyboardType] = useState<'standard'|'inline'>(null)
    const [inlineKeyboard, setinlineKeyboard] = useState<ButtonType[]>([])
    const [standardKeyboard, setStandardKeyboard] = useState<ButtonType[]>([])

    const onChannelChange = (e: RadioChangeEvent) => {
        setChannel(channels.find((el) => el.name === e.target.value));
        form.setFieldValue('messageValue', '')
        setinlineKeyboard([])
        setStandardKeyboard([])
    }

    const onKeyboardChange = (e: RadioChangeEvent) => {
        setKeyboardType(e.target.value)
    }

    const clickNewButton = () => {
        if (keyboardType === 'inline') {
            if (channel.inlineKeyboard.maxCountButtons > inlineKeyboard.length) {
                setinlineKeyboard([...inlineKeyboard, {} as ButtonType])
            }
        } else {
            if (channel.standardKeyboard.maxCountButtons > inlineKeyboard.length) {
                setStandardKeyboard([...standardKeyboard, {} as ButtonType])
            }
        }
    }

    const onChangeCheckBox = (e: any) => {
        if (keyboardType === 'inline') {
            if (!(!!channel?.inlineKeyboard?.countLinks)) {
                setinlineKeyboard((prev) => prev.map((el, index) => {
                    if (e.target.id === index.toString()+keyboardType+"link") {
                        return {...el, isLink: e.target.checked }
                    } else return el
                 }))
            } else {
                let countLinks = 0
                if (e.target.checked !== true) {
                    countLinks--
                }
                inlineKeyboard.forEach((button) => {
                    button['isLink'] ? countLinks++ : null
                })
                if (countLinks < channel?.inlineKeyboard?.countLinks) {
                    setinlineKeyboard((prev) => prev.map((el, index) => {
                        if (e.target.id === index.toString()+keyboardType+"link") {
                            return {...el, isLink: e.target.checked }
                        } else return el
                     }))
                } 
            }
        } else {
            if (!(!!channel?.inlineKeyboard?.countLinks)) {
                setStandardKeyboard((prev) => prev.map((el, index) => {
                    if (e.target.id === index.toString()+keyboardType+"link") {
                        return {...el, isLink: e.target.checked }
                    } else return el
                 }))
            } else {
                let countLinks = 0
                if (e.target.checked !== true) {
                    countLinks--
                }
                inlineKeyboard.forEach((button) => {
                    button['isLink'] ? countLinks++ : null
                })
                if (countLinks < channel?.inlineKeyboard?.countLinks) {
                    setStandardKeyboard((prev) => prev.map((el, index) => {
                        if (e.target.id === index.toString()+keyboardType+"link") {
                            return {...el, isLink: e.target.checked }
                        } else return el
                     }))
                } 
            }
        }
    }

    const onChangeBtn = (e: any) => {
        if (keyboardType === 'inline') {
            setinlineKeyboard((prev) => prev.map((el, index) => {
                if (e.target.id === index.toString()+keyboardType) {
                    return {...el, messageBtn: e.target.value }
                } else return el
             }))
        } else {
            setStandardKeyboard((prev) => prev.map((el, index) => {
                if (e.target.id === index.toString()+keyboardType) {
                    return {...el, messageBtn: e.target.value }
                } else return el
             }))
        }
    }

    const finishForm = async (e: any) => {
        try {
            const res = await axios.post('http://localhost:5000/api/settings/create', 
            { channel: form.getFieldValue('channelValue'), message: form.getFieldValue('messageValue'), inlineKeyboard: inlineKeyboard, standardKeyboard: standardKeyboard },
            {
               headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
               } 
            })
            alert(res.data.message)
        } catch (e) {
            alert((e as Error).message)
        }
    
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={finishForm}
        >
            {/*  */}
            <Form.Item name="channelValue" label="Канал" tooltip="Выберите канал для доступа к следующим настройкам">
                <Radio.Group onChange={onChannelChange}>
                    { channels && channels.map((channel, index) => {
                        return (
                            <Radio.Button key={index} value={channel.name}>{channel.name}</Radio.Button>
                        )
                    }) }
                </Radio.Group>
            </Form.Item>
            {/*  */}


            {/*  */}
            <Form.Item name="messageValue" label="Сообщение" tooltip="Введите ваше сообщение">
                <Input.TextArea
                    disabled={!(!!channel)} 
                    placeholder="Message" 
                    maxLength={channel ? channel.maxLengthMessage: 0} 
                    showCount={channel?.maxLengthMessage === Number.MAX_VALUE ? false : true}
                />
            </Form.Item>
            {/*  */}

            {/*  */}
            <Form.Item name="keyboardValue" label="Тип клавиатуры">
                <Radio.Group disabled={!(!!channel)} onChange={onKeyboardChange}>
                    <Radio.Button value={'standard'}>Standard Keyboard</Radio.Button>
                    <Radio.Button value={'inline'}>Inline Keyboard</Radio.Button>
                </Radio.Group>
            </Form.Item>
            {/*  */}

            <Form.Item label="Клавиатура">
                <Button disabled={!(!!keyboardType)} onClick={clickNewButton} type="primary">Добавить кнопку</Button>
            </Form.Item>

            {
                keyboardType === 'inline' ? inlineKeyboard.map((el, index) => {
                    return (
                        <ButtonKeyBoard 
                            key={index} 
                            onChangeCheckBox={onChangeCheckBox} 
                            onChange={onChangeBtn} 
                            btn={el} 
                            name={index.toString()+keyboardType} 
                            channel={channel} 
                            keyboardType={keyboardType}
                        />
                    )
                }) : standardKeyboard.map((el, index) => {
                    return (
                        <ButtonKeyBoard 
                            key={index} 
                            onChangeCheckBox={onChangeCheckBox} 
                            onChange={onChangeBtn} 
                            btn={el} 
                            name={index.toString()+keyboardType} 
                            channel={channel} 
                            keyboardType={keyboardType}
                        />
                    )
                })
            }
            
            <Form.Item>
                <Button disabled={!(!!channel)} htmlType='submit' type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default SettingForm;