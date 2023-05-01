/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const length = piles.length;

  // dp[i][j] is the maximum number of stones Alice can get when starting at index i with M = j
  const dp = new Array(length + 1).fill(0).map((_) => new Array(length + 1).fill(0));

  // sufsum[i] is the total number of stones from index i to the end
  const sufsum = new Array(length + 1).fill(0);

  for (let i = length - 1; i >= 0; i--) {
    sufsum[i] = sufsum[i + 1] + piles[i];
  }

  // the strategy for Alice is to choose an optimal X to minimize the number of stones Bob can get when starting at index (i + X) with M = max(X,j).
  for (let i = 0; i <= length; i++) {
    dp[i][length] = sufsum[i];
  }
  for (let i = length - 1; i >= 0; i--) {
    for (let j = length - 1; j >= 1; j--) {
      for (let X = 1; X <= 2 * j && i + X <= length; X++) {
        dp[i][j] = Math.max(dp[i][j], sufsum[i] - dp[i + X][Math.max(j, X)]);
      }
    }
  }
  return dp[0][1];
};

/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const len = piles.length;
  const mem = {};
  const sums = new Array(len).fill(0);
  sums[len - 1] = piles[len - 1];

  for (let i = len - 2; i >= 0; i--) {
    sums[i] = sums[i + 1] + piles[i]; // (1)
  }

  // (2)
  const helper = (index, M) => {
    const key = `${index}-${M}`;

    if (len - index <= 2 * M) return sums[index]; // (3)
    if (mem[key]) return mem[key];

    let res = 0;

    // (4)
    for (let x = 1; x <= 2 * M; x += 1) {
      const newM = Math.max(x, M); // (5)
      res = Math.max(res, sums[index] - helper(index + x, newM)); // (6)
    }

    mem[key] = res;
    return res;
  };

  return helper(0, 1);
};

// (1) sums[i] = piles[i] + sum(piles[i + 1], piles[i + 2], ... piles[n - 1]).

// (2) You can think of index as the starting position of the stone piles that are remaining. So at beginning, where index = 0,
// we have all the original piles left. If index = 2, then we have the piles[2] ... piles[n - 1] unclaimed.

// (3) In this case the current move will be the last move. Therefore, knowing this, a player will want to take advantage of this
// information by taken the remaining piles.

// (4) A player at any point in the game will have the option of taking x piles, where 1 <= x <= 2M. If the # of remaining piles is less
// than 2M, the if conditional clause at (3) takes care of it.

// (5) M, which initially equals 1, is the value used to set the limitation of stone piles a player can take at each turn.
// The value gets updated to M = Math.max(x, M) and the limit of stone piles is doubled based on the new value of M.

// (6) As x increases, the current player is taking more piles.
