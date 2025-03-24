/**
 * @param {number[]} heights
 * @return {number[]}
 */
var canSeePersonsCount = function (heights) {
  const n = heights.length;
  const stack = [];
  const res = [];

  for (let i = n - 1; i >= 0; i -= 1) {
    let count = 0;
    while (stack.length && stack[stack.length - 1] < heights[i]) {
      stack.pop();
      count += 1;
    }

    res[i] = stack.length ? count + 1 : count;
    stack.push(heights[i]);
  }

  return res;
};
