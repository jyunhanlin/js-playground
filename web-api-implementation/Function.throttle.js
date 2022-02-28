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

function throttle_swag(fn, delay) {
  let lastTime = new Date().getTime();
  let timer;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args);
        lastTime = now;
      }, delay - (now - lastTime));
    } else {
      fn.apply(this, args);
    }
  };
}
