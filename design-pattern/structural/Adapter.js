// Structural Design Patterns

// Adapter 適應能力

// 結合原本的能力，並應用新的API服務
// The Adapter Pattern tries to solve the problem of making two (or more) incompatible classes compatible,
// by using an intermediate class that implements a predefined interface.

// The Adapter pattern is useful when you have existing code, be it third party, or in-house,
// but out of your control, or otherwise not changeable to quite meet the interface you need it to.

class AdapterA {
  constructor() {
    this.adapter = 'some third party source'; // Adaptee A
  }
  getInfo() {
    return this.adapter.getInfo(); // <---
  }
}

class AdapterB {
  constructor() {
    this.adapter = 'some third party source'; // Adaptee B
  }

  getInfo() {
    return this.adapter.show(); // <---
  }
}

class Client {
  constructor(adapter) {
    this.adapter = adapter;
  }

  getInfo() {
    return this.adapter.getInfo();
  }

  setAdapter(adapter) {
    this.adapter = adapter;
  }
}

const adapterA = new AdapterA();
const adapterB = new AdapterB();

const client = new Client(adapterA);
console.log(client.getInfo());

client.setAdapter(adapterB);
console.log(client.getInfo());
