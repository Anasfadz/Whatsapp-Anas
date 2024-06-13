const express = require('express')
const messageRouter = require('./routers/messageRouter')
const whatsappClient = require('./services/WhatsappClient')

whatsappClient.initialize()

const app = express()

app.use(express.json())
app.use(messageRouter)

app.listen(80, () => console.log("server is ready"))