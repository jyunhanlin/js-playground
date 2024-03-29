/**
 * concept:
 * 連續按很多次 每個一段時間就會執行一次
 *
 * click:   *****-----****--
 * execute: --*--*------*--*
 */

function throttle(fn, delay) {
  let timer = true;

  return function (...args) {
    if (!timer) return;

    timer = false;
    fn.apply(this, args);

    setTimeout(() => {
      timer = true;
    }, delay);
  };
}

function throttle2(fn, delay, immediate) {
  let timer = true;

  let fireImmediate = immediate;

  return function (...args) {
    if (fireImmediate) {
      fn.apply(this, args);
      fireImmediate = false;
      return;
    }

    if (!timer) return;

    timer = false;
    setTimeout(function () {
      fn.apply(this, args);
      timer = true;
    }, delay);
  };
}

function throttleWithLatestArgs(fn, delay) {
  let lastTime = Date.now();
  let timer;

  return function (...args) {
    const now = Date.now();

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      lastTime = now;
      fn.apply(this, args);
    }, Math.max(0, delay - (now - lastTime)));
  };
}

function throttleWithLatestArgs2(fn, delay, { immediate, recurring }) {
  let isThrottled = false;
  let saveArgs = null;

  const executeFn = () => {
    if (!saveArgs) isThrottled = false;
    else {
      fn(...saveArgs);
      saveArgs = null;
      isThrottled = false;

      if (recurring) setTimeout(executeFn, delay);
    }
  };

  return (...args) => {
    if (isThrottled) {
      saveArgs = args;
      return;
    }

    if (immediate) fn(...args);

    isThrottled = true;
    setTimeout(executeFn, delay);
  };
}
