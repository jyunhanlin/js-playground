function Parent(name) {
  this.name = name;
  this.colors = ['red', 'yellow', 'green'];
}

Parent.prototype.getColors = function () {
  return this.colors;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors.push('aa'));
console.log(child1.getColors());
var child2 = new Child('daisy', '20');
console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.getColors());

