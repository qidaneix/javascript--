class Scheduler {
  constructor() {
    this.queue = [];
    this.maxConcurrentTasks = 2;
    this.currentTasks = 0;
  }

  add(promiseCreator) {
    return new Promise((resolve) => {
      this.queue.push(() => promiseCreator().then(resolve));
      this.runNext();
    });
  }

  runNext() {
    if (this.currentTasks < this.maxConcurrentTasks && this.queue.length > 0) {
      const task = this.queue.shift();
      this.currentTasks++;
      task().then(() => {
        this.currentTasks--;
        this.runNext();
      });
    }
  }
}

// Usage example
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output: 2 3 1 4
