/**
 * @param {number[]} arr
 * @return {number}
 */
var longestMountain = function (arr) {
  const len = arr.length;
  const dpUp = new Array(len).fill(0);
  const dpDown = new Array(len).fill(0);

  for (let i = 1; i < len; i += 1) {
    if (arr[i] > arr[i - 1]) dpUp[i] = dpUp[i - 1] + 1;
  }

  for (let i = len - 2; i >= 0; i -= 1) {
    if (arr[i] > arr[i + 1]) dpDown[i] = dpDown[i + 1] + 1;
  }

  let max = 0;
  for (let i = 0; i < len; i += 1) {
    if (dpUp[i] && dpDown[i]) max = Math.max(max, dpUp[i] + dpDown[i] + 1);
  }

  return max;
};
