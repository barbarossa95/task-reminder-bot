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
        this.mongoDbUri = process.env.MONGODB_URI || "mongodb://heroku_q6tk00h5:kdl956cponc3b8al8fbt2kdc21@ds059546.mlab.com:59546/heroku_q6tk00h5";
        this.dataBaseName = process.env.MONGODB_NAME || "heroku_q6tk00h5";
        this.MongoClient = require('mongodb').MongoClient;
    }

    job () {
        this.MongoClient.connect(this.mongoDbUri, function (err, client) {
            if (err) return;
            const db = client.db(this.dataBaseName);

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