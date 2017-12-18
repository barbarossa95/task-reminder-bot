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
// Mongo db connection uri
const mongoUri = mongoDbUriprocess.env.MONGODB_URI || "mongodb://heroku_q6tk00h5:kdl956cponc3b8al8fbt2kdc21@ds059546.mlab.com:59546/heroku_q6tk00h5";
// Mongo db name
const dataBaseName = process.env.MONGODB_NAME || "heroku_q6tk00h5";

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
const TaskController = require('./src/task-controller');

// Task controller
const taskController = new TaskController(mongoUri, dataBaseName);
// Bot instance
const bot       = new TaskReminderBot(options, taskController);
// Scheduler instance
const scheduler = new Scheduler(taskController, bot);
scheduler.start();