# setTimeout

## default setTimeout

There are diff between ideal and real

```js
function timer() {
  const speed = 50;
  let counter = 1;
  let start = new Date().getTime();

  function instance() {
    const ideal = counter * speed;
    let real = new Date().getTime() - start;

    counter++;

    console.log({ ideal, real, diff: real - ideal });

    window.setTimeout(instance, speed);
  }

  window.setTimeout(instance, speed);
}
timer();
```

## while

Exactly the same time, but block the main thread

```js
function timer(time) {
  const startTime = Date.now();
  while (true) {
    const now = Date.now();
    if (now - startTime >= time) {
      console.log(now - startTime - time);
      return;
    }
  }
}
timer(5000);
```

## Web Worker

Close to the same time, but block the worker thread

Create each worker for each timer

```js
const createWorker = (fn, options) => {
  const blob = new Blob(['(' + fn.toString() + ')()']);
  const url = URL.createObjectURL(blob);
  if (options) {
    return new Worker(url, options);
  }
  return new Worker(url);
};
// worker
const worker = createWorker(function () {
  onmessage = function (e) {
    const date = Date.now();
    while (true) {
      const now = Date.now();
      if (now - date >= e.data) {
        postMessage(1);
        return;
      }
    }
  };
});

let isStart = false;
function timer() {
  worker.onmessage = function (e) {
    cb();
    if (isStart) {
      worker.postMessage(speed);
    }
  };
  worker.postMessage(speed);
}
```

## requestAnimationFrame

Still have the diff

```js
function setTimeout2(cb, delay) {
  let startTime = Date.now();
  loop();

  function loop() {
    const now = Date.now();
    if (now - startTime >= delay) {
      cb();
      return;
    }
    requestAnimationFrame(loop);
  }
}
```

## setTimeout (speed - diff)

```js
function timer() {
  const speed = 500;
  let counter = 1;
  const start = new Date().getTime();

  function instance() {
    const ideal = counter * speed;
    const real = new Date().getTime() - start;

    counter++;

    console.log({ ideal, real, diff: real - ideal });

    // here!!
    window.setTimeout(instance, speed - diff);
  }

  window.setTimeout(instance, speed);
}
```
