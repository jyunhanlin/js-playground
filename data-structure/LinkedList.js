class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(item) {
    const node = new Node(item);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  addAt(index, item) {
    const node = new Node(item);
    let current = this.head;
    let count = 1;

    if (index === 0) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      while (current) {
        current = current.next;
        if (count === index) {
          node.prev = current.prev;
          current.prev.next = node;
          node.next = current;
          current.prev = node;
        }
        count++;
      }
    }
  }

  remove(item) {
    let current = this.head;

    while (current) {
      if (current.data === item) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }

      current = current.next;
    }
  }

  removeAt(index) {
    let current = this.head;
    let count = 1;

    if (index === 0) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      while (current) {
        current = current.next;
        if (count === index) {
          if (current === this.tail) {
            this.tail = this.tail.prev;
            this.tail.next = null;
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
            break;
          }
        }
        count++;
      }
    }
  }

  reverse() {
    let current = this.head;
    let prev = null;

    while (current) {
      let next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }

    this.tail = this.head;
    this.head = prev;
  }

  swap(index1, index2) {
    if (index1 > index2) return this.swap(index2, index1);

    let current = this.head;
    let count = 0;
    let firstNode = null;

    while (current) {
      if (count === index1) firstNode = current;
      else if (count === index2) {
        const temp = current.data;
        current.data = firstNode.data;
        firstNode.data = temp;
      }

      current = current.next;
      count++;
    }
  }

  isEmpty() {
    return this.length() < 1;
  }

  length() {
    let current = this.head;
    let count = 0;

    while (current) {
      count += 1;
      current = current.next;
    }

    return count;
  }

  traverse(fn) {
    let current = this.head;

    while (current) {
      fn(current);
      current = current.next;
    }
  }

  find(item) {
    let current = this.head;

    while (current) {
      if (current.data === item) return current;

      current = current.next;
    }

    return undefined;
  }
}
