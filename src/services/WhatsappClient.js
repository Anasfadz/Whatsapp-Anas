const { Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const  whatsappClient = new Client({
        authStrategy: new LocalAuth(),
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html`,
            puppeteer: { browser },
        }
    })

    whatsappClient.on("ready", () => console.log("client is ready"))

    whatsappClient.on("qr", (qr) => qrcode.generate(qr,{small:true} ))

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
})();
