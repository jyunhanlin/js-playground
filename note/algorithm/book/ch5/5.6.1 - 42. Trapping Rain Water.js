/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;

  let res = 0;

  for (let i = 1; i < n; i += 1) {
    let leftMax = 0;
    let rightMax = 0;

    for (let j = i; j < n; j += 1) {
      rightMax = Math.max(rightMax, height[j]);
    }

    for (let j = i; j >= 0; j -= 1) {
      leftMax = Math.max(leftMax, height[j]);
    }

    res += Math.min(leftMax, rightMax) - height[i];
  }

  return res;
};
