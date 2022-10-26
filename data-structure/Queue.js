class Queue {
  constructor(...args) {
    this.queue = [...args];
  }

  enqueue(...items) {
    return this.queue.push(...items);
  }

  dequeue() {
    return this.queue.shift();
  }

  front() {
    return this.isEmpty() ? undefined : this.queue[0];
  }

  back() {
    return this.isEmpty() ? undefined : this.queue[this.size() - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.queue.length;
  }
}
