const db = require('../db')

class SettingsController {
    async createSettings(req, res) {
        const {channel, message, inlineKeyboard, standardKeyboard} = req.body
        const setting = await db.query('INSERT INTO settings (channel, message) VALUES ($1,$2) RETURNING *', [channel, message])
        // console.log(setting.rows[0].id_standard_keyboard, setting.rows[0].id_inline_keyboard)
        inlineKeyboard?.forEach(async(el) => {
            if (el.isLink) {
                await db.query('INSERT INTO keyboard (id_keyboard, btn_text, is_inline, is_link) VALUES ($1,$2, true, $3)', [setting.rows[0].id_inline_keyboard, el.messageBtn, el.isLink])
            } else {
                await db.query('INSERT INTO keyboard (id_keyboard, btn_text, is_inline, is_link) VALUES ($1,$2, true, $3)', [setting.rows[0].id_inline_keyboard, el.messageBtn, false])
            }
        })
        standardKeyboard?.forEach(async(el) => {
            if (el.isLink) {
                await db.query('INSERT INTO keyboard (id_keyboard, btn_text, is_inline, is_link) VALUES ($1,$2, false, $3)', [setting.rows[0].id_standard_keyboard, el.messageBtn, el.isLink])
            } else {
                await db.query('INSERT INTO keyboard (id_keyboard, btn_text, is_inline, is_link) VALUES ($1,$2, false, $3)', [setting.rows[0].id_standard_keyboard, el.messageBtn, false])
            }
        })
        
        res.status(201).json({message: 'СОЗДАНО!'})
    }
    async updateSettings(req, res) {

    }
    async getSettings(req, res) {

    }
    async getOneSetting(req, res) {

    }
    async deleteSetting(req, res) {

    }
}
module.exports = new SettingsController()