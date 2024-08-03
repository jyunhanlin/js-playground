# reduce

## Count

```js
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  return accumulator;
}, {});
console.log(count); // Output: { apple: 3, banana: 2, orange: 1 }
```

## Shallow flatten

```js
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattenedArray = nestedArray.reduce(
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

## Group

```js
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 },
  { name: 'Emily', age: 30 },
];
const groupedPeople = people.reduce((accumulator, currentValue) => {
  const key = currentValue.age;
  if (!accumulator[key]) {
    accumulator[key] = [];
  }
  accumulator[key].push(currentValue);
  return accumulator;
}, {});
console.log(groupedPeople);
// Output: {
//   25: [{ name: 'Alice', age: 25 }, { name: 'David', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }, { name: 'Emily', age: 30 }],
//   35: [{ name: 'Charlie', age: 35 }]
// }
```

## Combine array into object

```js
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const person = keys.reduce((accumulator, currentValue, index) => {
  accumulator[currentValue] = values[index];
  return accumulator;
}, {});
console.log(person); // Output: { name: 'Alice', age: 25, gender: 'female' }
```

## Query string to object

```js
const str = 'key1=value1&key2=value2&key3=value3';
const obj = str.split('&').reduce((accumulator, currentValue) => {
  const [key, value] = currentValue.split('=');
  accumulator[key] = value;
  return accumulator;
}, {});
console.log(obj);
// Output: { key1: 'value1', key2: 'value2', key3: 'value3' }
```

## Object to query string

```js
const params = { foo: 'bar', baz: 42 };
const queryString = Object.entries(params)
  .reduce((acc, [key, value]) => {
    return `${acc}${key}=${value}&`;
  }, '?')
  .slice(0, -1);
console.log(queryString); // "?foo=bar&baz=42"
```

## fibonacci

```js
const fibonacci = (n) => {
  return [...Array(n)].reduce((accumulator, currentValue, index) => {
    if (index < 2) {
      accumulator.push(index);
    } else {
      accumulator.push(accumulator[index - 1] + accumulator[index - 2]);
    }
    return accumulator;
  }, []);
};
console.log(fibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## is palindrome

```js
const str = 'racecar';
const isPalindrome = str.split('').reduce((accumulator, currentValue, index, array) => {
  return accumulator && currentValue === array[array.length - index - 1];
}, true);
console.log(isPalindrome); // Output: true
```

## Parentheses match

```js
const str = '(()()())';
const balanced =
  str.split('').reduce((acc, cur) => {
    if (cur === '(') {
      acc++;
    } else if (cur === ')') {
      acc--;
    }
    return acc;
  }, 0) === 0;
console.log(balanced); // true
```

## Get value by nested key

```js
const user = {
  info: {
    name: 'Jason',
    address: { home: 'Shaanxi', company: 'Xian' },
  },
};
function get(config, path, defaultVal) {
  return path.split('.').reduce((config, name) => config[name], config) || defaultVal;
}
get(user, 'info.name'); // Jason
get(user, 'info.address.home'); // Shaanxi
get(user, 'info.address.company'); // Xian
get(user, 'info.address.abc', 'default'); // default
```

# My reduce

```js
function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue === undefined ? arr[0] : initialValue;
  for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}
```
