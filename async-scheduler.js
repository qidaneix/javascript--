class Scheduler {
  constructor(max) {
    this.max = max;
    this.cur = 0;
    this.temp = [];
  }

  add(callback) {
    if (this.cur === this.max) {
      // 缓存
      this.temp.push(callback);
    } else {
      // 直接执行
      this.run(callback);
    }
  }

  run(task) {
    this.cur += 1;
    task().then(() => {
      this.cur -= 1;
      if (this.temp.length) {
        const newTask = this.temp.shift();
        this.run(newTask);
      }
    });
  }
}

class AsyncScheduler {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.temp = [];
  }

  async add(task) {
    if (this.current === this.max) {
      this.temp.push(task);
      return;
    }

    return await this.run(task);
  }

  async run(task) {
    let result;
    try {
      this.current += 1;
      result = await task();
    } catch (error) {
      result = error;
    } finally {
      this.current -= 1;

      if (this.temp.length) {
        const newTask = this.temp.shift();
        this.run(newTask);
      }
      return result;
    }
  }
}

// 延迟函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new AsyncScheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
