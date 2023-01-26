// Structural Design Patterns

// Flyweight cache

class Color {
  constructor(name) {
    this.name = name;
  }
}

class colorCreator {
  constructor() {
    this.colors = {};
  }

  create(name) {
    let color = this.colors[name];
    if (color) return color;

    this.colors[name] = new Color(name);

    return this.colors[name];
  }
}

export { colorCreator };

function Color(name) {
  this.name = name;
}

var colorCreator = {
  colors: {},
  create: function (name) {
    var color = this.colors[name];
    if (color) return color;

    this.colors[name] = new Color(name);

    return this.colors[name];
  },
};

module.exports = colorCreator;
