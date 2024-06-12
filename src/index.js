const express = require('express');
const messageRouter = require('./routers/messageRouter');
const initWhatsAppClient = require('./services/WhatsappClient');

const app = express();
app.use(express.json());
app.use(messageRouter);

const startServer = async () => {
    try {
        const whatsappClient = await initWhatsAppClient();
        console.log("WhatsApp client initialized");
    } catch (error) {
        console.error("Error initializing WhatsApp client:", error);
    }

    app.listen(3000, () => console.log("Server is ready"));
};

startServer();