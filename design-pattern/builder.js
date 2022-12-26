// Creational Design Patterns

// Builder: 善於分解

// ## 什麼是 Builder ?
// 將建立一個個體的過程細分，拆分為不同的建立方法

class Car {
  #color = null;
  #spoiler = null;
  #fuelType = null;
  #productionDate = null;

  // We define a static Builder class within `Car`
  static Builder = class {
    // the builder class will have the same attributes as
    // the parent
    #color = null;
    #spoiler = null;
    #fuelType = null;
    #productionDate = null;

    // there are four methods to set each of the four
    // attributes
    setColor(color) {
      this.#color = color;
      // each method returns the builder object itself
      // this allows for chaining of methods
      return this;
    }

    setSpoiler(spoiler) {
      this.#spoiler = spoiler;
      return this;
    }

    setFuelType(fuelType) {
      this.#fuelType = fuelType;
      return this;
    }

    setProductionDate(date) {
      this.#productionDate = date;
      return this;
    }

    // when we're done setting arguments, we can call the build method
    // to give us the `Car` instance
    build() {
      const car = new Car(this.#color, this.#spoiler, this.#fuelType, this.#productionDate);
      return car;
    }
  };

  constructor(color, spoiler, fuelType, productionDate) {
    this.#color = color;
    this.#spoiler = spoiler;
    this.#fuelType = fuelType;
    this.#productionDate = productionDate;
  }

  toString() {
    return `color: ${this.#color}
spoiler: ${this.#spoiler}
fuel type: ${this.#fuelType}
production date: ${this.#productionDate}`;
  }
}

const car = new Car.Builder()
  .setColor('red')
  .setFuelType('petrol')
  .setProductionDate(new Date('2021-09-21'))
  .setSpoiler(false)
  .build();

console.log(car.toString());

// ----

// Abstract builder
function Shop() {
  this.construct = function (builder) {
    builder.step1();
    builder.step2();
    return builder.get();
  };
}

function CarBuilder() {
  this.car = null;

  this.step1 = function () {
    this.car = new Car();
  };

  this.step2 = function () {
    this.car.addParts();
  };

  this.get = function () {
    return this.car;
  };
}

function TruckBuilder() {
  this.truck = null;

  this.step1 = function () {
    this.truck = new Truck();
  };

  this.step2 = function () {
    this.truck.addParts();
  };

  this.get = function () {
    return this.truck;
  };
}

function Car() {
  this.doors = 0;

  this.addParts = function () {
    this.doors = 4;
  };

  this.say = function () {
    console.log('I am a ' + this.doors + '-door car');
  };
}

function Truck() {
  this.doors = 0;

  this.addParts = function () {
    this.doors = 2;
  };

  this.say = function () {
    console.log('I am a ' + this.doors + '-door truck');
  };
}

function run() {
  var shop = new Shop();
  var carBuilder = new CarBuilder();
  var truckBuilder = new TruckBuilder();
  var car = shop.construct(carBuilder);
  var truck = shop.construct(truckBuilder);

  car.say();
  truck.say();
}
