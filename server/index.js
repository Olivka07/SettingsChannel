const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')


const PORT = config.get('port') || 5000


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/settings', require('./routes/settings.routes'))



async function start() {
    try {
        app.listen(PORT, () => {console.log('App has been started')})
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


