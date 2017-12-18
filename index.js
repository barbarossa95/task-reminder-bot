/**
 * index.js
 *
 * Created by V.Greshilov at 16.12.2017
 *
 * Bot index file
 */

const telegramBotToken = process.env.TELEGRAM_BOT_API_TOKEN || '425725110:AAGGCMmtY8jPzmB6hwsCNVvjT8m4Mt2nrBY';
// Webhook port
const port = process.env.PORT || 443;
// Webhook url
const url = process.env.APP_URL || 'https://glacial-shelf-62769.herokuapp.com';
// Our bot class
const TaskReminderBot = require('./bot');
// Our scheluder class
const Scheluder = require('./scheluder');

let options = {
    telegramBotToken,
    url,
    port
};

// Bot instance
const bot = new TaskReminderBot(options);
// Scheluder instance
const sheluder = new Scheluder();
sheluder.start();
console.log('sheluder started');
