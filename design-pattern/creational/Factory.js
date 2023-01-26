// Creational Design Patterns

// Factory: 抽象思考

// ## 什麼是Factory？目的？
// From wiki
// it doesn’t explicitly require us to use a constructor.
// Instead, a Factory can provide a generic interface for creating objects,
// where we can specify the type of factory object we wish to be created.
// （使用工廠模式來產生instance，可以根據不同的input產生不一樣的instance，也可以隱藏一些複雜的過程）

// ## 什麼樣的場景可以使用Factory？
// When our object or component setup involves a high level of complexity
// When we need to easily generate different instances of objects depending on the environment we are in
// When we’re working with many small objects or components that share the same properties
// When composing objects with instances of other objects that need only satisfy an API contract (aka, duck typing) to work.This is useful for decoupling.

function Car(options) {}

function Truck(options) {}

function VehicleFactory() {}

VehicleFactory.prototype.createVehicle = function (options) {
  switch (options.vehicleType) {
    case 'car':
      this.vehicleClass = Car;
      break;
    case 'truck':
      this.vehicleClass = Truck;
      break;
    default:
      this.vehicleClass = Car;
      break;
  }
  return new this.vehicleClass(options);
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({ vehicleType: 'truck' });
