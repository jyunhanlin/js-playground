# JSON stringify

## When object has toJSON function

```js
const IntroToJSON = {
  name: 'test',
  toJSON: function () {
    return "it's toJSON";
  },
};

console.log(JSON.stringify(IntroToJSON)); // it's toJSON
```

## undefined, Object, Symbol

```js
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
```

## circular reference

```js
let objA = {
  name: 'test',
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
```

## symbol key

```js
JSON.stringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')]);
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function (k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol';
  }
});
// undefined
```

## NaN and Infinity

```js
const Intro = {
  name: 'test',
  age: NaN,
  money: Infinity,
};
let obj = JSON.stringify(Intro);
console.log(obj); // {"name":"test","age":null,"money":null}

JSON.stringify([NaN, Infinity]);
// [null,null]
```

## un-enumerable

```js
let person = Object.create(null, {
  name: { value: 'test', enumerable: false },
  age: { value: '25', enumerable: true },
});

console.log(JSON.stringify(person));
// {"age":"25"}
```

## third party

```js
import { parse, stringify } from 'lossless-json';

const text = '{"decimal":2.370,"long":9123372036854000123,"big":2.3e+500}';

// JSON.parse will lose some digits and a whole number:
console.log(JSON.stringify(JSON.parse(text)));
// '{"decimal":2.37,"long":9123372036854000000,"big":null}'
// WHOOPS!!!

// LosslessJSON.parse will preserve all numbers and even the formatting:
console.log(stringify(parse(text)));
// '{"decimal":2.370,"long":9123372036854000123,"big":2.3e+500}'
```


## replacer and reviver

```js
function replacer(key, value) {
  if (value instanceof Map) {
    return { __type: 'Map', value: Object.fromEntries(value) }
  }
  if (value instanceof Set) {
    return { __type: 'Set', value: Array.from(value) }
  }
  return value
}

function reviver(key, value) {
  if (value?.__type === 'Set') { 
    return new Set(value.value) 
  }
  if (value?.__type === 'Map') { 
    return new Map(Object.entries(value.value)) 
  }
  return value
}

const obj = { set: new Set([1, 2]), map: new Map([['key', 'value']]) }
const str = JSON.stringify(obj, replacer)
const newObj = JSON.parse(str, reviver)
// { set: new Set([1, 2]), map: new Map([['key', 'value']]) }
```
