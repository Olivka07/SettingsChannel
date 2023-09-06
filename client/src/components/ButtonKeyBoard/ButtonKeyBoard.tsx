import React, { FC} from 'react';
import {Form, Input, Checkbox} from 'antd'
import { ButtonType, ChannelType } from '../../models/index';

interface ButtonKeyBoardProps {
    name: string
    channel: ChannelType
    keyboardType: 'standard' | 'inline'
    btn: ButtonType
    onChange: (e:any) => void
    onChangeCheckBox: (e: any) => void
}
const ButtonKeyBoard:FC<ButtonKeyBoardProps> = ({btn, onChangeCheckBox, name, channel, keyboardType, onChange}) => {
    return (
        <div style={{padding: "8px", marginBottom: "8px"}}>
            <Form.Item label="Текст кнопки" name={name}>
                <Input.TextArea
                    onChange={onChange}
                    maxLength={keyboardType === 'standard' ? channel?.standardKeyboard.maxLengthBtnMessage: channel?.inlineKeyboard.maxLengthBtnMessage} 
                    showCount={
                        keyboardType === 'standard' ? 
                        (channel?.standardKeyboard.maxLengthBtnMessage === Number.MAX_VALUE ? false : true) 
                        : 
                        (channel?.inlineKeyboard.maxLengthBtnMessage === Number.MAX_VALUE ? false : true)
                    }
                />
            </Form.Item>
            

            { keyboardType === 'standard' ? 
                (channel?.standardKeyboard.isBtnLink ? 
                    <Form.Item name={name+'link'}>
                        <Checkbox checked={btn.isLink} onChange={onChangeCheckBox}>
                            Кнопка-ссылка
                        </Checkbox>
                    </Form.Item>
                    : null) :
                (channel?.inlineKeyboard.isBtnLink ? 
                    <Form.Item name={name+'link'}>
                        <Checkbox checked={btn.isLink} onChange={onChangeCheckBox}>
                            Кнопка-ссылка
                        </Checkbox>
                    </Form.Item>
                    : null) 
            }
            

        </div>
    );
};

export default ButtonKeyBoard;