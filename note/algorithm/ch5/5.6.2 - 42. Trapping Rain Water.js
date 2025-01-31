/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;

  let res = 0;

  const leftMax = [height[0]];
  const rightMax = [];
  rightMax[n - 1] = height[n - 1];

  for (let i = 1; i < n; i += 1) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }

  for (let i = n - 2; i >= 0; i -= 1) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }

  for (let i = 1; i < n - 1; i += 1) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return res;
};
