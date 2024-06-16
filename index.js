import dotenv from 'dotenv';
import {franc} from 'franc';
import TelegramBot from 'node-telegram-bot-api';
import translate from 'translate';

dotenv.config();

const token = process.env.TELEGRAM_ACCESS_TOKEN;

let bot;

if (!global.botInstance) {
    global.botInstance = new TelegramBot(token, { polling: true });
    bot = global.botInstance;

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        console.log(`Received message from user ID: ${userId}`);
        try {

            if (!text) return ;
            
            const detectLanguage = await franc(msg.text);
            console.log(detectLanguage);

            if (detectLanguage === 'en') {
                return;
            } else {
                const text = await translate(
                    msg.text, "en"
                )
                setTimeout(() => {
                    bot.sendMessage(chatId, text);
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }


        if (msg.text.trim().toLowerCase().match(/^(hello|hi{1,12})$/)) {
            bot.sendMessage(chatId, `👋 Hello!! ${msg.from.first_name}`);
        }

    });

} else {
    bot = global.botInstance;
}

console.log("Bot instance is running");
