/**
 * scheduler.js
 *
 * Created by V.Greshilov at 18.12.2017
 *
 * Class for running sendings sheduled messages to users
 */

class Scheduler {
    // Scheduler constructor
    constructor () {
        this.mongoDbUri = process.env.MONGODB_URI;
        this.MongoClient = require('mongodb').MongoClient;
    }

    job () {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            console.log("Conneted to mongo db");
            const db = client.db;

            let date = new Date(),
                description = "Test task description";
            date = date.toJSON();
            let task = {
                description,
                date
            };

            db.collection('tasks').insertOne(task, function (err, r) {
                r.insertedCount == 1
                ? console.log('inserted one documet')
                : console.log(err);
            });
        });
    }

    start () {
        this.timeInterval = setInterval(this.job.bind(this), 5000);
    }

    stop () {
        clearInterval(this.timeInterval);
    }
}

module.exports = Scheduler;