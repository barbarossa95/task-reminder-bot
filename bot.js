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
        let TelegramBotApi = require('node-telegram-bot-api');

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

        // Set up webhook
        this.botApi.setWebHook(`${this.url}/bot${this.telegramBotToken}`);

        //this.botApi.onText(/\/start/, this.cmdStart);
    }

    cmdStart(msg) {
        this.botApi.sendMessage(msg.chat.id, "Greetings, dude\nI'm here to help you");
    }
 }

 module.exports = Bot;