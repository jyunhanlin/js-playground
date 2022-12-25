// 什麼是Abstract Factory? 目的是？
// When need an implementation of a factory to be more dynamic
// Expected to enable developers to extend functionality
// （可以動態的增加或修改factory的內容）
// 多套方案

function Car(options) {}
function Truck(options) {}

var abstractVehicleFactory = (function () {
  // Storage for our vehicle types
  var types = {};

  return {
    getVehicle: function (type, customizations) {
      var Vehicle = types[type];
      return Vehicle ? new Vehicle(customizations) : null;
    },

    registerVehicle: function (type, Vehicle) {
      var proto = Vehicle.prototype;
      // only register classes that fulfill the vehicle contract
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }
      return abstractVehicleFactory;
    },
  };
})();

// Usage:
abstractVehicleFactory.registerVehicle('car', Car);
abstractVehicleFactory.registerVehicle('truck', Truck);

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle('car', options);

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle('truck', options);
