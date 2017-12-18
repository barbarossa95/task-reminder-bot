/**
 * scheduler.js
 *
 * Created by V.Greshilov at 18.12.2017
 *
 * Class for running sendings sheduled messages to users
 */

class Scheduler {
    // Scheduler constuctor
    constuctor () {
        this.mongolabUri = process.env.MONGOLAB_URI;
        this.MongoClient = require('mongodb').MongoClient;
    }

    job () {
        console.log('Job call');
        console.log(this);
        /*this.MongoClient.connect(this.mongolabUri, function (err, client) {
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
        */
    }

    start () {
        this.timeInterval = setInterval(this.job.bind(this), 5000);
    }

    stop () {
        clearInterval(this.timeInterval);
    }
}

module.exports = Scheduler;