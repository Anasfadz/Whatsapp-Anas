const express = require('express')
const messageRouter = require('./routers/messageRouter')
const whatsappClient = require('./services/WhatsappClient')
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const client = new whatsappClient({
        puppeteer: { browser },
    });

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();

    const app = express()

    app.use(express.json())
    app.use(messageRouter)

    app.listen(3000, () => console.log("server is ready"))
})();
