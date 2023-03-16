// Behavioral Design Patterns

// Observer 主動通知相關的 deps

class Observable {
  constructor() {
    this.observerList = [];
  }
  addObserver(observer) {
    this.observerList.push(observer);
  }
  notify() {
    this.observerList.forEach((observer) => observer.update());
  }
}

class Observer {
  constructor(doSome) {
    this.doSome = doSome;
  }
  update() {
    console.log(this.doSome);
  }
}

const ob1 = new Observer('Observable 1');
const ob2 = new Observer('Observable 2');
const obs = new Observable();
obs.addObserver(ob1);
obs.addObserver(ob2);
obs.notify();
