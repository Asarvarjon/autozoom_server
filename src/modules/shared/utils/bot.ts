import TelegramBot from 'node-telegram-bot-api';

const token: string = process.env.BOT_TOKEN 

const bot = new TelegramBot(token, {polling: true})

export default bot;