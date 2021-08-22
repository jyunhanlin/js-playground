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
