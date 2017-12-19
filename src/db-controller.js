/**
 * task-controller.js
 *
 * Created by V.Greshilov at 18.12.2017
 *
 * Controller of the tasks
 */

class DbController {
    constructor (mongoDbUri, dataBaseName) {
        this.mongoDbUri = mongoDbUri;
        this.dataBaseName = dataBaseName;
        this.MongoClient = require('mongodb').MongoClient;
    }

    saveTask (task) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                db.tasks.insertOne(task);
                client.close();
                resolve()
            });
        });
    }

    findChat (username) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                let chat = db.chats.find({ username : username });
                if (!chat) reject(null);
                client.close();
                resolve(chat);
            });
        });
    }

    remove (task) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                db.tasks.deleteOne({"_id" : task._id});
                client.close();
                resolve();
            });
        });

    }

    getReadyTasks () {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                let tasks = db.tasks
                    .find({ expectedDate : { $gte : new Date() }}).toArray();
                client.close();
                resolve(tasks);
            });
        };
    }

    saveChat (chat)) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                db.chats.insertOne(chat);
                client.close();
            });
        };
    }
}

module.exports = DbController;