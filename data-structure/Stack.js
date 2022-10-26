class Stack {
  constructor(...args) {
    this.stack = [...args];
  }

  push(...items) {
    return this.stack.push(...items);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.isEmpty() ? undefined : this.stack[this.size() - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.stack.length;
  }
}
