const express = require('express')
const messageRouter = require('./routers/messageRouter')
const whatsappClient = require('./services/WhatsappClient')

const port = process.env.PORT || 3000;

whatsappClient.initialize()

const app = express()

app.use(express.json())
app.use(messageRouter)

app.listen(port, "0.0.0.0", () => console.log("server is ready"))