/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let res = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (leftMax < rightMax) {
      res += leftMax - height[left];
      left += 1;
    } else {
      res += rightMax - height[right];
      right -= 1;
    }
  }

  return res;
};
