class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, callback) {
    if (this.events[name]) {
      this.events[name].push(callback);
    } else {
      this.events[name] = [callback];
    }
  }
  off(name, callback) {
    if (!this.message[name]) return;
    if (!callback) {
      this.message[name] = undefined;
    }
    this.message[name] = this.message[name].filter((item) => item !== callback);
  }
  emit(name, ...args) {
    if (!this.events[name]) return;
    this.events[name].forEach((cb) => cb(...args));
  }
}
