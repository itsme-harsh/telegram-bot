import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const token = process.env.TELEGRAM_ACCESS_TOKEN;

let bot;

if (!global.botInstance) {
    global.botInstance = new TelegramBot(token, { polling: true });
    bot = global.botInstance;

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        console.log(`Received message from user ID: ${userId}`);

        if (msg.text.trim().toLowerCase() === "hello") {
            bot.sendMessage(chatId, `Hello!! ${msg.from.first_name}`);
        }

    });

} else {
    bot = global.botInstance;
}

console.log("Bot instance is running");
