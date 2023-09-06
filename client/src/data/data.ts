import { ChannelType } from "../models/index";

export const channels:ChannelType[] = [
    {
        name: 'ВКонтакте',
        maxLengthMessage: 4096,
        inlineKeyboard: {
            maxCountButtons: 10,
            maxLengthBtnMessage: Number.MAX_VALUE,
            isBtnLink: true
        },
        standardKeyboard: {
            maxCountButtons: 40,
            maxLengthBtnMessage: Number.MAX_VALUE,
            isBtnLink: true
        }
    },
    {
        name: 'Telegram',
        maxLengthMessage: 4096,
        inlineKeyboard: {
            maxCountButtons: Number.MAX_VALUE,
            maxLengthBtnMessage: 64,
            isBtnLink: true
        },
        standardKeyboard: {
            maxCountButtons: Number.MAX_VALUE,
            maxLengthBtnMessage: Number.MAX_VALUE,
            isBtnLink: false
        }
    },
    {
        name: 'WhatsApp',
        maxLengthMessage: 1000,
        inlineKeyboard: {
            maxCountButtons: 3,
            maxLengthBtnMessage: 20,
            isBtnLink: true,
            countLinks: 1
        },
        standardKeyboard: {
            maxCountButtons: 10,
            maxLengthBtnMessage: 20,
            isBtnLink: false
        }
    },
    {
        name: 'SMS',
        maxLengthMessage: Number.MAX_VALUE,
        inlineKeyboard: {
            maxCountButtons: 0,
            maxLengthBtnMessage: 0,
            isBtnLink: false
        },
        standardKeyboard: {
            maxCountButtons: 0,
            maxLengthBtnMessage: 0,
            isBtnLink: false
        }
    }
]