const { Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const  whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox',],
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/2.2412.54v2.html`
    }
    // webVersion: "2.2412.54v2"
})

whatsappClient.on("ready", () => console.log("client is ready"))

whatsappClient.on("qr", (qr) => qrcode.generate(qr,{small:false} ))

whatsappClient.on("message", async (msg) => {
    try{
        if(msg.from != "status@broadcast") {
            const contact = await msg.getContact()
            console.log(contact, msg.body)
        }
    }
    catch(error) {
        console.log(error)
    }
})

module.exports = whatsappClient