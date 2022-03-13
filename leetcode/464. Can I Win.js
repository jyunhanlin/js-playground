/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
  const picked = new Array(maxChoosableInteger + 1).fill(false);
  const memo = new Map();

  if (desiredTotal <= maxChoosableInteger)
    // because player1 can just pick the max and win
    return true;

  // this formula gives us the sum from 1...maxChoosableInteger, and if the sum cannot exceed the desiredTotal, no one wins
  if (((1 + maxChoosableInteger) / 2) * maxChoosableInteger < desiredTotal) return false;

  function dfs(picked, total) {
    let key = picked.toString();

    if (memo.has(key)) return memo.get(key);

    // we try every number minus the one that's been tried
    for (let i = 1; i <= maxChoosableInteger; i++) {
      if (picked[i]) {
        continue;
      }

      picked[i] = true;

      // if we win here OR player2 does not win next
      if (total - i <= 0 || !dfs(picked, total - i)) {
        // do not forget to backtrack!
        picked[i] = false;
        memo.set(key, true);
        return true;
      }
      // do not forget to backtrack!
      picked[i] = false;
    }

    memo.set(key, false);
    return false;
  }

  return dfs(picked, desiredTotal);
};
