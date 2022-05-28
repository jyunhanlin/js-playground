/**
 * concept:
 * 連續按很多次 每個一段時間才會執行一次
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

function throttleWithLatestArgs(fn, delay) {
  let lastTime = new Date().getTime();
  let timer;

  return function (...args) {
    const now = new Date().getTime();

    if (!timer) lastTime = now;

    if (delay > now - lastTime) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args);
      }, delay - (now - lastTime));
    } else {
      if (timer) clearTimeout(timer);
      fn.apply(this, args);
    }
    lastTime = now;
  };
}
