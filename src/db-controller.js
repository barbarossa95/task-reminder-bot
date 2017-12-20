/**
 * task-controller.js
 *
 * Created by V.Greshilov at 18.12.2017
 *
 * Controller of the tasks
 */

class DbController {
    constructor (mongoDbUri, dataBaseName) {
        console.log("Init DbController");
        this.mongoDbUri = mongoDbUri;
        this.dataBaseName = dataBaseName;
        this.MongoClient = require('mongodb').MongoClient;
        this.MongoClient.connect(this.mongoDbUri, (err, client) => {
            //init storage
            client.db(this.dataBaseName).createCollection('tasks');
            client.db(this.dataBaseName).createCollection('chats');
        });

    }

    saveTask (task) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                db.collection('tasks').insertOne(task);
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

                let chat = db.collection('chats').findOne({ username : username });
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

                db.collection('tasks').deleteOne({"_id" : task._id});
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

                let tasks = db.collection('tasks')
                    .find({ expectedDate : { $gte : new Date() }}).toArray();
                client.close();
                resolve(tasks);
            });
        });
    }

    saveChat (chat) {
        return new Promise((resolve, reject) => {
            this.MongoClient.connect(this.mongoDbUri, (err, client) => {
                if (err) reject(err);
                const db = client.db(this.dataBaseName);

                db.collection('chats').insertOne(chat);
                client.close();
                resolve();
            });
        });
    }
}

module.exports = DbController;