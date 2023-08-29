1. use removeEventListener

```js
const myCallback = () => {
  console.log('clicked!');
};

document.getElementById('button').addEventListener('click', myCallback);
document.getElementById('button').removeEventListener('click', myCallback);
```

2. use once option in addEventListener

```js
const button = document.getElementById('button');

button.addEventListener(
  'click',
  () => {
    console.log('clicked!');
  },
  { once: true }
);

// 'clicked!'
button.click();

// No more listeners!
getEventListeners(button); // {}
```

3. use AbortController()

```js
const button = document.getElementById('button');
const controller = new AbortController();
const { signal } = controller;

button.addEventListener('click', () => console.log('clicked!'), { signal });
window.addEventListener('resize', () => console.log('resized!'), { signal });
document.addEventListener('keyup', () => console.log('pressed!'), { signal });

// Remove all listeners at once:
controller.abort();
```
