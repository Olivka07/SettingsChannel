export interface IKeyboard {
    maxCountButtons: number
    maxLengthBtnMessage: number
    isBtnLink: boolean
    countLinks?: number
}

export interface ChannelType {
    name: string
    maxLengthMessage: number
    standardKeyboard: IKeyboard
    inlineKeyboard: IKeyboard
}

export interface IChannel {
    channelValue: string
    messageValue: string
    inlineKeyboard: ButtonType[]
    standardKeyboard: ButtonType[]
}

export interface ButtonType {
    isLink: boolean
    messageBtn: string
}