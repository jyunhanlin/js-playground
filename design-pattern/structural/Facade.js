// Structural Design Patterns

// Facade 深入淺出

// 提供一個統一的API，API內則是包含了多種不同的實作

var Mortgage = function (name) {
  this.name = name;
};

Mortgage.prototype = {
  applyFor: function (amount) {
    // access multiple subsystems...
    var result = 'approved';
    if (!new Bank().verify(this.name, amount)) {
      result = 'denied';
    } else if (!new Credit().get(this.name)) {
      result = 'denied';
    } else if (!new Background().check(this.name)) {
      result = 'denied';
    }
    return this.name + ' has been ' + result + ' for a ' + amount + ' mortgage';
  },
};

var Bank = function () {
  this.verify = function (name, amount) {
    // complex logic ...
    return true;
  };
};

var Credit = function () {
  this.get = function (name) {
    // complex logic ...
    return true;
  };
};

var Background = function () {
  this.check = function (name) {
    // complex logic ...
    return true;
  };
};

function run() {
  var mortgage = new Mortgage('Joan Templeton');
  var result = mortgage.applyFor('$100,000');

  console.log(result);
}
