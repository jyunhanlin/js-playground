// Memory Limit Exceeded
var minOperations = function (x, A) {
  const sum = A.reduce((a, b) => a + b);
  if (sum % x === 0) return 0;

  const n = A.length;
  const maxSum = sum + n;
  const dp = new Array(n + 1).fill().map(() => new Array(maxSum + 1).fill(Infinity));

  for (let i = 0; i < n; i += 1) {
    const a = A[i];
    for (let j = 0; j < maxSum; j += 1) {
      // j + a
      if (j + a <= maxSum) dp[i + 1][j + a] = Math.min(dp[i + 1][j + a], dp[i][j]);

      // j + a + 1
      if (j + a + 1 <= maxSum) {
        let cur = dp[i][j] !== Infinity ? dp[i][j] : 0;
        dp[i + 1][j + a + 1] = Math.min(dp[i + 1][j + a + 1], cur + 1);
      }

      // j - a
      if (j - a >= 0) {
        let cur = dp[i][j] !== Infinity ? dp[i][j] : 0;
        dp[i + 1][j - a] = Math.min(dp[i + 1][j - a], cur + 1);
      }
    }
  }

  let min = n;

  for (let i = 0; i < maxSum; i += 1) {
    if (dp[n][i] !== Infinity && i % x === 0) min = Math.min(min, dp[n][i]);
  }

  return min;
};

// Time Limit Exceeded
function minOperations(x, A) {
  const sum = A.reduce((a, b) => a + b, 0);
  const n = A.length;
  const maxSum = sum + n; // 最多可能增加到的和（每個元素都 +1 一次）

  // dp[i][j] = 用前 i 個元素，讓總和變成 j 的最少操作次數
  const dp = new Array(n + 1).fill().map(() => new Array(maxSum + 1).fill(Infinity));

  // 初始狀態：沒用任何元素，總和為 0，操作數為 0
  dp[0][0] = 0;

  for (let i = 0; i < n; i++) {
    const a = A[i];

    for (let j = 0; j <= maxSum; j++) {
      // 只從「可達狀態」轉移
      if (dp[i][j] === Infinity) continue;

      const cur = dp[i][j];

      // 選擇 1：刪除這個元素（總和不變）
      dp[i + 1][j] = Math.min(dp[i + 1][j], cur + 1);

      // 選擇 2：保留這個元素（總和加上 a）
      if (j + a <= maxSum) {
        dp[i + 1][j + a] = Math.min(dp[i + 1][j + a], cur);
      }

      // 選擇 3：保留並 +1 任意多次
      // 從 j+a 開始，每次 +1 都要花費一次操作
      for (let k = 1; j + a + k <= maxSum; k++) {
        dp[i + 1][j + a + k] = Math.min(
          dp[i + 1][j + a + k],
          cur + k // k 次 +1 操作
        );
      }
    }
  }

  // 找出所有「總和是 x 的倍數」的狀態中，操作次數最小的
  let ans = Infinity;
  for (let j = 0; j <= maxSum; j++) {
    if (j % x === 0 && dp[n][j] < ans) {
      ans = dp[n][j];
    }
  }

  return ans;
}
