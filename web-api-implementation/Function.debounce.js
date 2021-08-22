/**
 * concept:
 * 連續按很多次 依然只後最後一次的setTimeout之後會執行
 *
 * click:   *****-----****--
 * execute: ------*--------*
 *
 */

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
