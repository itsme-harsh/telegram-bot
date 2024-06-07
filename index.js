import translate from '@vitalets/google-translate-api';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

// Replace 'YOUR_TOKEN' with your bot's API token
const bot = new TelegramBot(process.env.TELEGRAM_ACCESS_TOKEN, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId == process.env.SPECIFIC_USER_ID) {
        const text = msg.text;

        translate(text, { to: 'en' })
            .then(res => {
                bot.sendMessage(chatId, `Translation: ${res.text}`);
            })
            .catch(err => {
                console.error(err);
                bot.sendMessage(chatId, 'Sorry, something went wrong with the translation.');
            });
    }
});
