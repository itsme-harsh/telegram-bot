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

            if (!msg.text) return ;
            
            const detectLanguage = await franc(msg.text);
            console.log(detectLanguage);

        if (msg.text.trim().toLowerCase().match(/^(hello|hi{1,12})$/)) {
            bot.sendMessage(chatId, `👋 Hello!! ${msg.from.first_name}`);
       return ;
        }
            
            if (detectLanguage === 'eng') {
                return;
            } else if (detectLanguage === "und"){
                return ;
            }else{
                const text = await translate(
                    msg.text, 
                    {
                        from : "tl",
                        to:"en"
                    }
                )
                
                    bot.sendMessage(chatId, text);
            
            }
        } catch (error) {
            console.log(error);
        }

    });

} else {
    bot = global.botInstance;
}

console.log("Bot instance is running");
