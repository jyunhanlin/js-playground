/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  let curr_len = 0,
    curr_negative_count = 0,
    max_len = 0;
  let first_negative_index = -1,
    last_negative_index = -1;

  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] === 0 || i === nums.length) {
      // reset curr
      if (curr_negative_count % 2 === 0) {
        max_len = Math.max(curr_len, max_len);
      } else {
        max_len = Math.max(
          max_len,
          i - first_negative_index - 1,
          curr_len - i + last_negative_index
        );
      }

      curr_len = 0;
      curr_negative_count = 0;
      first_negative_index = -1;
      last_negative_index = -1;
      continue;
    }

    if (nums[i] < 0) {
      if (first_negative_index === -1) {
        first_negative_index = i;
      }
      last_negative_index = i;
      curr_negative_count++;
    }

    curr_len++;
  }

  return max_len;
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
