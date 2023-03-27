// Creational Design Patterns

// Singleton: 專注

// ## 什麼是singleton？singleton的目的是？
// 保證一個類別只會有一個實體
// 目的是需要一個物件來管理整個系統的操作

// ## 什麼場景用得到？
// 當instance內的資源需要共享的時候
// one object is needed to coordinate others across a system.
// 在一個合作物件對此實體的修改之後，另一個合作物件也需要知道該修改

// ## 需要注意什麼？
// Singletons can be more difficult to test due to issues ranging from hidden dependencies,
// the difficulty in creating multiple instances, difficulty in stubbing dependencies and so on.

// -----
var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Object('I am the instance');
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

function run() {
  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();

  console.log('Same instance? ' + (instance1 === instance2));
}

// -----
class Person {
  constructor() {
    if (typeof Person.instance === 'object') {
      return Person.instance;
    }

    Person.instance = this;

    return this;
  }
}

// -----

function Person() {
  if (typeof Person.instance === 'object') return Person.instance;

  Person.instance = this;

  return this;
}

// -----

class SingletonClass {
  constructor() {
    if (!SingletonClass.instance) {
      SingletonClass.instance = this;
    }

    return SingletonClass.instance;
  }
  // other things
}

const instance = new SingletonClass();
Object.freeze(instance);

export default instance;
