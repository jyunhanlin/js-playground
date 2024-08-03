# async await

## The return value of async function

- non thenable, non promise

  - push to microtask queue

  ```javascript
  async function foo() {
    return 'foo';
  }
  foo().then(() => console.log('a'));
  Promise.resolve()
    .then(() => console.log('b'))
    .then(() => console.log('c'));
  // a b c
  ```

- thenable

  - wait for next microtask queue

  ```javascript
  class Bar {
    then(resolve) {
      resolve();
      console.log('then');
    }
  }

  async function foo() {
    // return new Bar()
    return {
      then(resolve, reject) {
        resolve(); // required
        console.log('then');
      },
    };
  }
  foo().then(() => console.log('a'));
  Promise.resolve()
    .then(() => console.log('b'))
    .then(() => console.log('c'));
  // then b a c
  ```

- promise

  - wait for next two microtask queue

  ```javascript
  async function foo() {
    return Promise.resolve('foo');
  }
  foo().then(() => console.log('a'));
  Promise.resolve()
    .then(() => console.log('b'))
    .then(() => console.log('c'))
    .then(() => console.log('d'));

  // b c a d
  ```

## The value type after await

- non thenable, non promise

  - push to microtask queue

  ```javascript
  async function foo() {
    await 'foo';
    console.log('a');
  }
  foo().then(() => console.log('b'));
  Promise.resolve()
    .then(() => console.log('c'))
    .then(() => console.log('d'));
  // a c b d
  ```

- thenable

  - wait for next microtask queue

  ```javascript
  async function foo() {
    await {
      then(resolve) {
        resolve();
        console.log('then');
      },
    };
    console.log('a');
  }
  foo().then(() => console.log('b'));
  Promise.resolve()
    .then(() => console.log('c'))
    .then(() => console.log('d'))
    .then(() => console.log('e'));
  // then c a d b e
  ```

- promise

  - push to microtask queue

  ```javascript
  async function foo() {
    await Promise.resolve('foo');
    console.log('a');
  }
  foo().then(() => console.log('b'));
  Promise.resolve()
    .then(() => console.log('c'))
    .then(() => console.log('d'))
    .then(() => console.log('e'));
  // a c b d e
  ```

  - wait for next two microtask queue (before node.js v11)

## Summary

```javascript
function baz() {
  // console.log('baz')
  // return 'baz'

  // return {
  //   then(resolve) {
  //     console.log('baz')
  //     resolve()
  //   }
  // }

  return new Promise((resolve) => {
    console.log('baz');
    resolve();
  });
}

async function foo() {
  await baz();
  console.log('a');
}
foo().then(() => console.log('b'));
Promise.resolve()
  .then(() => console.log('c'))
  .then(() => console.log('d'))
  .then(() => console.log('e'));
// await baz is not promise nor thenable => baz a c b d e
// await baz is thenable => baz c a d b e
// await baz is promise => baz a c b d e
```

```javascript
async function baz() {
  // console.log('baz')
  // return 'baz'

  // return {
  //   then(resolve) {
  //     console.log('baz')
  //     resolve()
  //   }
  // }

  return new Promise((resolve) => {
    console.log('baz');
    resolve();
  });
}

async function foo() {
  await baz();
  console.log('a');
}
foo().then(() => console.log('b'));
Promise.resolve()
  .then(() => console.log('c'))
  .then(() => console.log('d'))
  .then(() => console.log('e'));
// await baz is not promise nor thenable => baz a c b d e
// await baz is thenable => baz c a d b e
// await baz is promise => baz c d a e b
// before node.js 11, await baz is promise => baz c d e a b
```

## Combine async, await, Promise, then and setTimeout

```javascript
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1');
  }, 2000);
  await new Promise((resolve) => {
    console.log('promise1');
    resolve();
  });
  console.log('async1 end');
  return Promise.resolve('async1 success');
};
console.log('script start');
async1().then((res) => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(Promise.resolve(2))
  .catch(3)
  .then((res) => console.log(res));
setTimeout(() => {
  console.log('timer2');
}, 1000);

// script start
// async1
// promise1
// script end
// async1 end
// 1
// async1 success
// timer2
// timer1
```

```javascript
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1');
  }, 2000);
  await new Promise((resolve) => {
    console.log('promise1');
  });
  console.log('async1 end');
  return 'async1 success';
};
console.log('script start');
async1().then((res) => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res));
setTimeout(() => {
  console.log('timer2');
}, 1000);
// script start
// async1
// promise1
// script end
// 1
// timer2
// timer1
```

```javascript
async function async1 () {
    console.log('1')
    await async2()
    console.log('AAA')
}
​
async function async2 () {
    console.log('3')
    return new Promise((resolve, reject) => {
        resolve()
        console.log('4')
    })
}
​
console.log('5')
​
setTimeout(() => {
    console.log('6')
}, 0);
​
async1()
​
new Promise((resolve) => {
    console.log('7')
    resolve()
}).then(() => {
    console.log('8')
}).then(() => {
    console.log('9')
}).then(() => {
    console.log('10')
})
console.log('11')
​
// 5 1 3 4 7 11 8 9 AAA 10 6
```
