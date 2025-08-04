/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  arr.sort((a, b) => a - b);

  let minDiff = Infinity;

  let result;
  for (let i = 1; i < arr.length; i += 1) {
    const diff = Math.abs(arr[i] - arr[i - 1]);

    const pair = [arr[i - 1], arr[i]];
    if (diff < minDiff) {
      minDiff = diff;
      result = [pair];
    } else if (diff == minDiff) {
      result.push(pair);
    }
  }

  return result;
};
