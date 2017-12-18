/**
 * bot.js
 *
 * Created by Greshilov at 16.12.2017
 *
 * Bot main file
 */

class TaskReminderBot {
    // Bot Constuctor
    constructor(options, taskController) {
        const TelegramBotApi = require('node-telegram-bot-api');

        // Init props
        this.telegramBotToken = options.telegramBotToken;
        this.port = options.port;
        this.url = options.url;

        this.taskController = taskController;

        // Init botApi
        this.botApi = new TelegramBotApi(this.telegramBotToken, {
            webHook: {
                port: this.port
            }
        });

        // Set up webhook
        this.botApi.setWebHook(`${this.url}/bot${this.telegramBotToken}`);

        this.botApi.onText(/\/start/, this.cmdStart.bind(this));

        this.botApi.onText(/\/chat-id/, this.cmdChatId.bind(this));

        this.botApi.onText(/(\/creata-task) ((\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})) (.+)/, this.cmdCreateTasks.bind(this));
   }

    cmdStart (msg) {
        this.botApi.sendMessage(msg.chat.id, "Greetings, dude\nI'm here to help you");
        this.taskController.saveChat(chat);
    }

    notyfy(taks) {
        this.botApi.sendMessage(task.user.)
    }

    cmdChatId(msg) {
        this.botApi.sendMessage(msg.chat.id, "Current chat_id is " + msg.chat.id);
    }

    cmdCreateTasks (msg, match) {
        let username = match[1],
            expectedDate = new Date(match[2]).toISOString(),
            description = match[8];

        let task = {

        }

    }
 }

 module.exports = TaskReminderBot;