/**
 * @param {number} n
 * @return {number}
 */
var nthPersonGetsNthSeat = function (n) {
  if (n === 1) return 1;

  return 1 / 2;
};

/**
 * @param {number} n
 * @return {number}
 */
var nthPersonGetsNthSeat = function (n) {
  if (n === 1) return 1;
  return 1 / n + ((n - 2) / n) * nthPersonGetsNthSeat(n - 1);
};

// explanation: https://leetcode.com/problems/airplane-seat-assignment-probability/discuss/411905/It's-not-obvious-to-me-at-all.-Foolproof-explanation-here!!!-And-proof-for-why-it's-12
