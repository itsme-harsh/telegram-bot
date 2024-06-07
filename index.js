import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const SPECIFIC_USER_ID = process.env.SPECIFIC_USER_ID;

const bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello! Send me a message, and I will translate it into English.');
});

bot.on('message', (msg) => {
    const userId = msg.from.id;
    const chatId = msg.chat.id;
    console.log(msg.text);
    if (userId == SPECIFIC_USER_ID) {
        if(msg.text == "hello" || "hi"){
            bot.sendMessage(hello, msg.from);
        }
    } else if (!msg.text.startsWith('/start')) {
        bot.sendMessage(chatId, 'Sorry, this bot is only for a specific user.');
    }
});