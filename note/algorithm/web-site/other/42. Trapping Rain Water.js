/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;

  let leftMax = 0;
  let rightMax = 0;

  let res = 0;

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

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;

  const leftMax = new Array(n);
  const rightMax = new Array(n);

  leftMax[0] = height[0];
  rightMax[n - 1] = height[n - 1];

  for (let i = 1; i < n; i += 1) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  for (let i = n - 2; i >= 0; i -= 1) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let res = 0;
  for (let i = 1; i < n - 1; i += 1) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return res;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;
  let res = 0;

  for (let i = 0; i < n; i += 1) {
    let leftMax = 0;
    let rightMax = 0;

    for (let j = i; j >= 0; j -= 1) {
      leftMax = Math.max(leftMax, height[j]);
    }

    for (let j = i; j < n; j += 1) {
      rightMax = Math.max(rightMax, height[j]);
    }

    res += Math.min(leftMax, rightMax) - height[i];
  }

  return res;
};
