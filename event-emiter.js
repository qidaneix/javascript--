class EventDispatcher {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (this.events[event]) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback];
    }
  }

  emit(event, e) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => {
        callback(e);
      });
    }
  }

  remove(event, callback) {
    if (this.events[event]) {
      this.events[event].filter((i) => i === callback);
    }
  }
}
