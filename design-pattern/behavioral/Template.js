// Behavioral Design Patterns

// Template 繼承

// ES6
class Tax {
  calc(value) {
    if (value >= 1000) value = this.overThousand(value);

    return this.complementaryFee(value);
  }

  complementaryFee(value) {
    return value + 10;
  }
}

class Tax1 extends Tax {
  constructor() {
    super();
  }

  overThousand(value) {
    return value * 1.1;
  }
}

class Tax2 extends Tax {
  constructor() {
    super();
  }

  overThousand(value) {
    return value * 1.2;
  }
}

// ES5
function Tax() {}
Tax.prototype.calc = function (value) {
  if (value >= 1000) value = this.overThousand(value);

  return this.complementaryFee(value);
};

Tax.prototype.complementaryFee = function (value) {
  return value + 10;
};

function Tax1() {}
Tax1.prototype = Object.create(Tax.prototype);

Tax1.prototype.overThousand = function (value) {
  return value * 1.1;
};

function Tax2() {}
Tax2.prototype = Object.create(Tax.prototype);

Tax2.prototype.overThousand = function (value) {
  return value * 1.2;
};
