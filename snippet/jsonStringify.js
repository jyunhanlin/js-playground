// 1. when object has toSJON function
let toJsonMyIntro = {
  name: 'Gopal',
  age: 25,
  like: 'FE',
  toJSON: function () {
    return "it's toJSON";
  },
};

console.log(JSON.stringify(toJsonMyIntro)); // it's toJSON

// ------

// 2. undefined, Object, Symbol
JSON.stringify([undefined, Object, Symbol('')]);
// '[null,null,null]'

JSON.stringify({ x: undefined, y: Object, z: Symbol('') });
// '{}'

const testObj = { x: undefined, y: Object, z: Symbol('test') };

const resut = JSON.stringify(testObj, function (key, value) {
  if (value === undefined) {
    return 'undefined';
  } else if (typeof value === 'symbol' || typeof value === 'function') {
    return value.toString();
  }
  return value;
});

console.log(resut);
// {"x":"undefined","y":"function Object() { [native code] }","z":"Symbol(test)"}

// ------

// 3. circualr reference
let objA = {
  name: 'Gopal',
};

let objB = {
  age: 25,
};

objA.age = objB;
objB.name = objA;
JSON.stringify(objA);

// Uncaught TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Object'
//     |     property 'age' -> object with constructor 'Object'
//     --- property 'name' closes the circle
//     at JSON.stringify (<anonymous>)
//     at <anonymous>:1:6

// ------

// 4. symbol key
JSON.stringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')]);
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function (k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol';
  }
});
// undefined

// ------

// 5. NaN and Infinity
let me = {
  name: 'Gopal',
  age: Infinity,
  money: NaN,
};
let originObj = JSON.stringify(me);
console.log(originObj); // {"name":"Gopal","age":null,"money":null}

JSON.stringify([NaN, Infinity]);
// [null,null]

// ------

// 6. un-enumberable
let person = Object.create(null, {
  name: { value: 'Gopal', enumerable: false },
  age: { value: '25', enumerable: true },
});

console.log(JSON.stringify(person));
// {"age":"25"}
