/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  if (4 > matchsticks.length) return false;
  const sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 !== 0) return false;

  let used = 0;
  const target = sum / 4;
  let found = false;
  const backtrack = (index, len, k) => {
    if (k === 0) {
      found = true;
      return;
    }
    if (found) return;

    if (len === target) {
      backtrack(0, 0, k - 1);
      return;
    }

    for (let i = index; i < matchsticks.length; i++) {
      if (((used >> i) & 1) === 1) continue;
      if (matchsticks[i] + len > target) continue;

      used |= 1 << i;
      len += matchsticks[i];

      backtrack(i + 1, len, k);

      used ^= 1 << i;
      len -= matchsticks[i];
    }
  };

  backtrack(0, 0, 4);

  return found;
};
