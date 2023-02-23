/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function (arr, difference) {
  let res = 1;

  for (let i = 0; i < arr.length - 1; i += 1) {
    let curRes = 1;
    let pre = arr[i];
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] - pre === difference) {
        pre = arr[j];
        curRes += 1;
      }
    }

    res = Math.max(curRes, res);
  }

  return res;
};

var longestSubsequence = function (arr, difference) {
  const seen = {};
  let res = 0;

  for (let x of arr) {
    seen[x] = seen[x - difference] ? seen[x - difference] + 1 : 1;
    res = Math.max(seen[x], res);
  }

  return res;
};
