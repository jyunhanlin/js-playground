/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);

  let max = 0;
  for (const num of set) {
    if (set.has(num - 1)) continue;

    let len = 1;
    let curNum = num;
    while (set.has(curNum + 1)) {
      curNum += 1;
      len += 1;
    }
    max = Math.max(max, len);
  }

  return max;
};
