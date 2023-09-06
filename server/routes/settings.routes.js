const {Router} = require('express')
const cors = require('cors')
const router = Router()
const SettingsController = require('../controller/settings.controller')

const corsConfig = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

const CORS = cors(corsConfig)

// api/settings/create
router.post('/create', CORS, SettingsController.createSettings)
// api/settings/getall
router.get('/getall', SettingsController.getSettings)

router.get('/getone/:id', SettingsController.getOneSetting)

router.put('/update', SettingsController.updateSettings)

router.delete('/delete/:id', SettingsController.deleteSetting)

module.exports = router