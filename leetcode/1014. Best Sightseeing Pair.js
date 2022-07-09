/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function (values) {
  // values[i] + values[j] + i - j
  // (values[i] + i) + (values[j] - j)
  let max = 0;
  let pre = values[0] - 0;

  for (let i = 1; i < values.length; i += 1) {
    max = Math.max(max, pre + values[i] - i);
    pre = Math.max(pre, values[i] + i); // key point
  }

  return max;
};
