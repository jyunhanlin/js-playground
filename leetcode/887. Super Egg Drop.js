/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0));

  const drop = (floors, eggs) => {
    if (eggs == 1 || floors <= 1) return floors;
    if (dp[floors][eggs] > 0) return dp[floors][eggs];
    let min = Infinity;
    for (let i = 1; i <= floors; i++) {
      // breaking egg: drop(i - 1, egg - 1)
      // non breaking egg: drop(floor - i , egg) <-- Think the i floor become the 0 floor
      min = Math.min(min, 1 + Math.max(drop(i - 1, eggs - 1), drop(floors - i, eggs)));
    }
    dp[floors][eggs] = min;
    return min;
  };

  return drop(n, 2);
};

/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0));

  const drop = (floors, eggs) => {
    if (eggs == 1 || floors <= 1) return floors;
    if (dp[floors][eggs] > 0) return dp[floors][eggs];

    let min = Infinity;
    let start = 1,
      end = floors;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const broken = drop(mid - 1, eggs - 1);
      const nonBroken = drop(floors - mid, eggs);

      if (broken > nonBroken) {
        end = mid - 1;
        min = Math.min(min, broken + 1);
      } else {
        start = mid + 1;
        min = Math.min(min, nonBroken + 1);
      }
    }

    dp[floors][eggs] = min;

    return min;
  };

  return drop(n, 2);
};
