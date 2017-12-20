/**
 * index.js
 *
 * Created by V.Greshilov at 16.12.2017
 *
 * Bot index file
 */

console.log("Load env");
const telegramBotToken = process.env.TELEGRAM_BOT_API_TOKEN || '425725110:AAGGCMmtY8jPzmB6hwsCNVvjT8m4Mt2nrBY';
// Webhook port
const port = process.env.PORT || 443;
// Webhook url
const url = process.env.APP_URL || 'https://glacial-shelf-62769.herokuapp.com';
// Mongo db connection uri
const mongoUri = process.env.MONGODB_URI || "mongodb://heroku_q6tk00h5:kdl956cponc3b8al8fbt2kdc21@ds059546.mlab.com:59546/heroku_q6tk00h5";
// Mongo db name
const dataBaseName = process.env.MONGODB_NAME || "heroku_q6tk00h5";
console.log("Loaded");

const options = {
    telegramBotToken,
    url,
    port
};

// Our bot class
const TaskReminderBot = require('./src/bot');
// Our scheluder class
const Scheduler = require('./src/scheduler');
// Our task controller class
const DbController = require('./src/db-controller');

// Task controller
const dbController      = new DbController(mongoUri, dataBaseName);
// Bot instance
const bot               = new TaskReminderBot(options, dbController);
// Scheduler instance
const scheduler         = new Scheduler(dbController, bot);

bot.on('onStartSchedulerCommand', () => scheduler.start());
bot.on('onStartSchedulerCommand', () => console.log('fire event onStartSchedulerCommand'));
bot.on('onStopSchedulerCommand', () => scheduler.stop());
bot.on('onStopSchedulerCommand', () => console.log('fire event onStopSchedulerCommand'));
scheduler.start();