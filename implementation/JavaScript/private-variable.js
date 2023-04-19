class User {
  constructor(name) {
    let _name = name;
    this.getName = function () {
      return _name;
    };
  }
}

const User = (function () {
  const _name = Symbol('name');

  class User {
    constructor(name) {
      this[_name] = name;
    }

    getName() {
      return this[_name];
    }
  }

  return User;
})();

const User = (function () {
  const wp = WeakMap();

  class User {
    constructor(name) {
      wp.set(this, { name });
    }

    getName() {
      return wp.get(this).name;
    }
  }

  return User;
})();

const proxy = function (obj) {
  return new Proxy(obj, {
    get(target, key) {
      if (key.startWith('_')) {
        return new Error('private key error');
      }
      return Reflect.get(target, key);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => !key.startWith('_'));
    },
  });
};
