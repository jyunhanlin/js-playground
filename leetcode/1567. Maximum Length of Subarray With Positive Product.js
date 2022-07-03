/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  let maxLen = 0,
    startNeg = -1,
    startPos = -1,
    running = 1;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (!num) {
      (startNeg = -1), (startPos = -1), (running = 1);
      continue;
    }

    running *= num;

    if (num < 0 && startNeg === -1) startNeg = i;
    if (num > 0 && startPos === -1) startPos = i;

    if (running > 0) {
      maxLen = Math.max(
        maxLen,
        startPos === -1 ? -Infinity : i - startPos + 1,
        startNeg === -1 ? -Infinity : i - startNeg + 1
      );
    } else if (startNeg !== -1) maxLen = Math.max(maxLen, i - startNeg);
  }
  return maxLen;
};

// Brute force
/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  let max = 0;

  for (let i = 0; i < nums.length; i += 1) {
    let negCount = 0;
    let count = 0;
    let afterNegCount = 0;
    for (let j = i; j < nums.length; j += 1) {
      if (nums[j] === 0) {
        break;
      }
      if (nums[j] > 0) {
        if (negCount) {
          afterNegCount += 1;
        }
        count += 1;
      } else {
        negCount += 1;
        if (negCount % 2 === 0) {
          afterNegCount = 0;
          negCount = 0;
          count += 2;
        }
      }
    }
    if (afterNegCount) {
      count -= afterNegCount;
    }

    max = Math.max(max, count);
  }

  return max;
};
