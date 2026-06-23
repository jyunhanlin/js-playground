// ============================================================
//  思路演進：前兩版為註解（會 MLE / TLE），最後一版為可執行的最終解
//  狀態 dp[i][dir][j] = 長度 i、結尾值 (l + j)、下一步方向 dir
//        dir = 1 -> 下一步往上 (UP)，dir = 0 -> 下一步往下 (DOWN)
// ============================================================
//
// ---------- 階段一：樸素三維 DP（會 TLE + MLE）----------
// dp[i][1][j] 下一步往上、dp[i][0][j] 下一步往下
// var zigZagArrays = function (n, l, r) {
//   const MOD = 1000000007n;
//   const m = r - l + 1;
//   const dp = Array.from({ length: n + 1 }, () => [new Array(m).fill(0n), new Array(m).fill(0n)]);
//   for (let j = 0; j < m; j += 1) {
//     dp[1][0][j] = 1n;
//     dp[1][1][j] = 1n;
//   }
//   for (let i = 2; i <= n; i += 1) {
//     for (let j = 0; j < m; j += 1) {
//       // 往上跳到 j：前一個值 k < j，前一層需要往上
//       for (let k = 0; k < j; k += 1) dp[i][0][j] = (dp[i][0][j] + dp[i - 1][1][k]) % MOD;
//       // 往下跳到 j：前一個值 k > j，前一層需要往下
//       for (let k = j + 1; k < m; k += 1) dp[i][1][j] = (dp[i][1][j] + dp[i - 1][0][k]) % MOD;
//     }
//   }
//   let ans = 0n;
//   for (let j = 0; j < m; j += 1) ans = (ans + dp[n][0][j] + dp[n][1][j]) % MOD;
//   return Number(ans);
// };
// 問題：dp 開了 n * 2 * m 個 BigInt -> MLE；內層 for k -> 時間 O(n * m^2) -> TLE
//
// ---------- 階段二：砍掉 i 維度（滾動陣列）-> 解決 MLE ----------
// 算 dp[i] 只用到 dp[i - 1]，更早的層用不到，只留 prev / cur 兩層。
// var zigZagArrays = function (n, l, r) {
//   const MOD = 1000000007n;
//   const m = r - l + 1;
//   let prev = [new Array(m).fill(1n), new Array(m).fill(1n)];
//   for (let i = 2; i <= n; i += 1) {
//     const cur = [new Array(m).fill(0n), new Array(m).fill(0n)];
//     for (let j = 0; j < m; j += 1) {
//       for (let k = 0; k < j; k += 1) cur[0][j] = (cur[0][j] + prev[1][k]) % MOD;
//       for (let k = j + 1; k < m; k += 1) cur[1][j] = (cur[1][j] + prev[0][k]) % MOD;
//     }
//     prev = cur;
//   }
//   let ans = 0n;
//   for (let j = 0; j < m; j += 1) ans = (ans + prev[0][j] + prev[1][j]) % MOD;
//   return Number(ans);
// };
// 空間 O(n * m) -> O(m)，MLE 解決。但仍有 for k -> O(n * m^2)，還是 TLE。
//
// 心法：只被下一層用到的維度可滾動掉（省空間）；
//       表現為對連續區間求和的維度可前綴和掉（省時間）。
//
// ---------- 最終解：前綴 / 後綴和（時間 O(n * m)，空間 O(m)）----------
// newDown[j] = sum(up[k])   for k < j  => up 的前綴和
// newUp[j]   = sum(down[k]) for k > j  => down 的後綴和

/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
  const MOD = 1000000007n;
  const m = r - l + 1;

  // up[j]   : 結尾值 (l + j)，下一步必須往上 (UP)
  // down[j] : 結尾值 (l + j)，下一步必須往下 (DOWN)
  // 滾動陣列只保留當前層 -> 避免 MLE
  let up = new Array(m).fill(1n);
  let down = new Array(m).fill(1n);

  for (let i = 2; i <= n; i += 1) {
    const newUp = new Array(m).fill(0n);
    const newDown = new Array(m).fill(0n);

    // 往上跳：前綴和邊掃邊累積，存進 newDown（往上之後下一步往下）
    let prefix = 0n;
    for (let j = 0; j < m; j += 1) {
      newDown[j] = prefix;
      prefix = (prefix + up[j]) % MOD;
    }

    // 往下跳：後綴和由右往左累積，存進 newUp（往下之後下一步往上）
    let suffix = 0n;
    for (let j = m - 1; j >= 0; j -= 1) {
      newUp[j] = suffix;
      suffix = (suffix + down[j]) % MOD;
    }

    up = newUp;
    down = newDown;
  }

  let ans = 0n;
  for (let j = 0; j < m; j += 1) {
    ans = (ans + up[j] + down[j]) % MOD;
  }
  return Number(ans);
};

// time complexity: O(n * m)
// space complexity: O(m)
