/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const res = [];
  const stack = [];

  for (let i = n - 1; i >= 0; i -= 1) {
    while (stack.length) {
      if (temperatures[stack[stack.length - 1]] > temperatures[i]) break;
      stack.pop();
    }

    res[i] = stack.length ? stack[stack.length - 1] - i : 0;

    stack.push(i);
  }

  return res;
};
