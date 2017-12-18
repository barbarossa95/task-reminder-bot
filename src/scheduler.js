/**
 * scheduler.js
 *
 * Created by V.Greshilov at 17.12.2017
 *
 * Class for running sendings sheduled messages to users
 */

class Scheduler {
    // Scheduler constructor
    constructor (taskController, botController) {
        this.taskController = taskController;
        this.botController = botController;
    }

    job () {
        this.taskController.getReadyTasks(function (tasks) {
            tasks.forEach(function (task) {
                this.botController.notyfy(task);
                this.taskController.remove(task);
            });
        })
    }

    start () {
        this.timeInterval = setInterval(this.job.bind(this), 5000);
    }

    stop () {
        clearInterval(this.timeInterval);
    }
}

module.exports = Scheduler;