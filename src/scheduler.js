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
        this.dbController = dbController;
        this.botController = botController;
        this.timeInterval = null;
    }

    job () {
        this.dbController.getReadyTasks()
            .then((tasks) => {
                tasks.forEach((task) => {
                    this.botController.sendTask(task);
                    this.dbController.remove(task);
                });
            });

        this.dbController.getReadyTasks((tasks) => {

        })
    }

    start () {
        if (!this.timeInterval) {
            this.timeInterval = setInterval(this.job.bind(this), (process.env.SCHEDULER_INTERVAL || 5000);
        }
    }

    stop () {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        }
    }
}

module.exports = Scheduler;