/**
 * task-controller.js
 *
 * Created by V.Greshilov at 18.12.2017
 *
 * Controller of the tasks
 */

class TaskController {
    constructor (mongoDbUri, dataBaseName) {
        this.mongoDbUri = mongoDbUri;
        this.dataBaseName = dataBaseName;
        this.MongoClient = require('mongodb').MongoClient;
    }

    create (task, callback) {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            const db = client.db(this.dataBaseName);

            db.tasks.insertOne(task, callback);
            client.close();
        });
    }

    remove (task) {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            const db = client.db(this.dataBaseName);

            db.tasks.deleteOne({"_id" : task._id});
            client.close();
        });
    }

    getReadyTasks (callback) {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            const db = client.db(this.dataBaseName);

            let tasks = db.tasks
                .find({"expectedDate" : { $gte : new Date().toISOString() }})
            client.close();
            callback(tasks);
        });
    }

    saveChat (chat, callback) {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            const db = client.db(this.dataBaseName);

            db.chats.insertOne(chat, callback);
            client.close();
        });
    }
}

module.exports = TaskController;