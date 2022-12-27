// Structural Design Patterns

// Adapter 適應能力

// 結合原本的能力，並應用新的API服務

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
