import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

// Replace 'YOUR_TOKEN' with your bot's API token
const bot = TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId == process.env.SPECIFIC_USER_ID) {
        if ((msg.text).toLowercase() == "hello" || "hi") {
            bot.sendMessage(chatId, `Translation: ${res.text}`);
        }
    }
});
