const { Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const  whatsappClient = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'sessions'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox',],
    },
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