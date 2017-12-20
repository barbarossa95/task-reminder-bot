/**
 * scheduler.js
 *
 * Created by V.Greshilov at 17.12.2017
 *
 * Class for running sendings sheduled messages to users
 */

class Scheduler {
    // Scheduler constructor
    constructor (dbController, botController) {
        console.log("Init Scheduler");
        this.dbController = dbController;
        this.botController = botController;
        this.timeInterval = null;
    }

    job () {
        this.dbController.getReadyTasks()
            .then((tasks) => {
                console.log("Scheduler job, tasks count: " + tasks.length)
                tasks.forEach((task) => {
                    this.botController.sendTask(task)
                    .then(() => this.dbController.remove(task))
                    .then(() => console.log('task was sended and removed'))
                    .catch((err) => console.error(err))
                });
            });
    }

    start () {
        if (!this.timeInterval) {
            this.timeInterval = setInterval(this.job.bind(this), (process.env.SCHEDULER_INTERVAL || 5000));
            console.log("Scheduler started");
        }
    }

    stop () {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
            console.log("Scheduler stoped");
        }
    }
}

module.exports = Scheduler;