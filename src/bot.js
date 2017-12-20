/**
 * bot.js
 *
 * Created by Greshilov at 16.12.2017
 *
 * Bot main file
 */

const EventEmitter = require('events');

class TaskReminderBot extends EventEmitter {
    // Bot Constuctor
    constructor(options, dbController) {
        console.log("Init TaskReminderBot");
        //must call super for "this" to be defined.
        super();
        const TelegramBotApi = require('node-telegram-bot-api');

        // Init props
        this.telegramBotToken = options.telegramBotToken;
        this.port = options.port;
        this.url = options.url;

        this.dbController = dbController;

        // Init botApi
        this.botApi = new TelegramBotApi(this.telegramBotToken, {
            webHook: {
                port: this.port
            }
        });

        // Set up webhook
        this.botApi.setWebHook(`${this.url}/bot${this.telegramBotToken}`);

        this.botApi.onText(/\/start/, this.cmdStart.bind(this));

        this.botApi.onText(/\/start-scheduler/, this.cmdStartScheduler.bind(this));

        this.botApi.onText(/\/stop-scheduler/, this.cmdStopScheduler.bind(this));

        this.botApi.onText(/\/chat-id/, this.cmdChatId.bind(this));

        this.botApi.onText(/(\/create-task) (@\w{5,}) ((\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})) (.+)/, this.cmdCreateTasks.bind(this));
   }

    cmdStart (msg) {
        this.botApi.sendMessage(msg.chat.id, "Greetings, dude\nI'm here to help you");
        this.dbController.saveChat(chat)
            .then(() => console.log("New chat"))
            .catch((err) => console.error(err));
    }

    cmdChatId(msg) {
        this.botApi.sendMessage(msg.chat.id, "Current chat_id is " + msg.chat.id);
    }

    cmdStartScheduler(msg) {
        this.botApi.sendMessage(msg.chat.id, "StartScheduler command is called");
        this.emit('onStartSchedulerCommand');
    }

    cmdStopScheduler(msg) {
        this.botApi.sendMessage(msg.chat.id, "StopScheduler command is called");
        this.emit('onStopSchedulerCommand');
    }

    cmdCreateTasks (msg, match) {
        // console.log(match);
        let task = {
            username: match[1],
            expectedDate: new Date(match[2]),
            description: match[8],
            chat: msg.chat
        };

        this.dbController.findChat(username).then((chat) => {
            task.chat = chat;
            this.dbController.saveTask(task);
        });
    }

    sendTask (task) {
        return new Promise((resolve, reject) => {
            if (!task.chat || !task.chat.id) reject(new Error("Unable to send task - chat is undefined"));
            let message = `Time OUT\n
                       Task: ${task.description}\n
                       Assigned at: @${task.username}\n
                       Complete time: ${task.expectedDate}`;
            this.botApi.sendMessage(task.chat.id, message);
            resolve();
        });
    }
 }

 module.exports = TaskReminderBot;