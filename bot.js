/**
 * bot.js
 *
 * Created by Greshilov at 16.12.2017
 *
 * Bot main file
 */

 class Bot {
    // Bot Constuctor
    constructor(options) {
        const TelegramBotApi = require('node-telegram-bot-api');
        const MongoClient = require('mongodb').MongoClient;

        // Init props
        this.telegramBotToken = options.telegramBotToken;
        this.port = options.port;
        this.url = options.url;

        // Init botApi
        this.botApi = new TelegramBotApi(this.telegramBotToken, {
            webHook: {
                port: this.port
            }
        });

        // Init mongo
        this.mongoUri = options.mongoUri

        // Set up webhook
        this.botApi.setWebHook(`${this.url}/bot${this.telegramBotToken}`);

        this.botApi.onText(/\/start/, this.cmdStart.bind(this));

        this.botApi.onText(/\/command1/, this.cmd1.bind(this));

        /*
        this.botApi.onText(/\/start/, this.cmd.bind(this));

        this.botApi.onText(/\/start/, this.cmd.bind(this));

        this.botApi.onText(/\/start/, this.cmd.bind(this));
        */

    }

    // Send help message on start
    cmdStart(msg) {
        this.botApi.sendMessage(msg.chat.id, "Greetings, dude\nI'm here to help you");
    }

    cmd1(msg) {
        this.botApi.sendMessage(msg.chat.id, "command1 echo");
    }
 }

 module.exports = Bot;