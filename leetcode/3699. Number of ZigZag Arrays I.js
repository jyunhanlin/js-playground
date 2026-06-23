// ============================================================
//  思路演進：每個版本的完整程式碼（前三版為註解，最後一版可執行）
//  狀態 dp[i][dir][j] = 長度 i、結尾值 (l+j)、下一步方向 dir
//        dir = 1 -> 下一步往上 (UP)，dir = 0 -> 下一步往下 (DOWN)
// ============================================================
//
// ---------- 階段 0：樸素三維 DP（會 TLE + MLE）----------
// var zigZagArrays = function(n, l, r) {
//     const MOD = 1000000007n;
//     const m = r - l + 1;
//     // dp[i][1][j] 下一步往上、dp[i][0][j] 下一步往下
//     const dp = Array.from({length: n + 1}, () =>
//         [new Array(m).fill(0n), new Array(m).fill(0n)]);
//     for (let j = 0; j < m; j++) { dp[1][0][j] = 1n; dp[1][1][j] = 1n; }
//     for (let i = 2; i <= n; i++) {
//         for (let j = 0; j < m; j++) {
//             // 往上跳到 j：前一個值 k < j，前一層需要往上
//             for (let k = 0; k < j; k++)
//                 dp[i][0][j] = (dp[i][0][j] + dp[i-1][1][k]) % MOD;
//             // 往下跳到 j：前一個值 k > j，前一層需要往下
//             for (let k = j + 1; k < m; k++)
//                 dp[i][1][j] = (dp[i][1][j] + dp[i-1][0][k]) % MOD;
//         }
//     }
//     let ans = 0n;
//     for (let j = 0; j < m; j++) ans = (ans + dp[n][0][j] + dp[n][1][j]) % MOD;
//     return Number(ans);
// };
// 問題：dp 開了 n*2*m 個 BigInt -> MLE；內層 for k -> 時間 O(n*m^2) -> TLE
//
// ---------- 階段 1：砍掉 i 維度（滾動陣列）-> 解決 MLE ----------
// 算 dp[i] 只用到 dp[i-1]，更早的層用不到，只留 prev / cur 兩層。
// var zigZagArrays = function(n, l, r) {
//     const MOD = 1000000007n;
//     const m = r - l + 1;
//     let prev = [new Array(m).fill(1n), new Array(m).fill(1n)];
//     for (let i = 2; i <= n; i++) {
//         const cur = [new Array(m).fill(0n), new Array(m).fill(0n)];
//         for (let j = 0; j < m; j++) {
//             for (let k = 0; k < j; k++)
//                 cur[0][j] = (cur[0][j] + prev[1][k]) % MOD;
//             for (let k = j + 1; k < m; k++)
//                 cur[1][j] = (cur[1][j] + prev[0][k]) % MOD;
//         }
//         prev = cur;
//     }
//     let ans = 0n;
//     for (let j = 0; j < m; j++) ans = (ans + prev[0][j] + prev[1][j]) % MOD;
//     return Number(ans);
// };
// 空間 O(n*m) -> O(m)，MLE 解決。但仍有 for k -> O(n*m^2)，還是 TLE。
//
// ---------- 階段 2：砍掉 k 迴圈（前綴/後綴和）-> 解決 TLE ----------
// cur[0][j] = sum(prev[1][k]) for k<j  => prev[1] 的前綴和
// cur[1][j] = sum(prev[0][k]) for k>j  => prev[0] 的後綴和
// var zigZagArrays = function(n, l, r) {
//     const MOD = 1000000007n;
//     const m = r - l + 1;
//     let prev = [new Array(m).fill(1n), new Array(m).fill(1n)];
//     for (let i = 2; i <= n; i++) {
//         const cur = [new Array(m).fill(0n), new Array(m).fill(0n)];
//         let prefix = 0n;
//         for (let j = 0; j < m; j++) {
//             cur[0][j] = prefix;                  // sum prev[1][0..j-1]
//             prefix = (prefix + prev[1][j]) % MOD;
//         }
//         let suffix = 0n;
//         for (let j = m - 1; j >= 0; j--) {
//             cur[1][j] = suffix;                  // sum prev[0][j+1..m-1]
//             suffix = (suffix + prev[0][j]) % MOD;
//         }
//         prev = cur;
//     }
//     let ans = 0n;
//     for (let j = 0; j < m; j++) ans = (ans + prev[0][j] + prev[1][j]) % MOD;
//     return Number(ans);
// };
// 每層 O(m^2) -> O(m)，時間 O(n*m^2) -> O(n*m)，TLE 解決。
//
// 心法：只被下一層用到的維度可滾動掉（省空間）；
//       表現為對連續區間求和的維度可前綴和掉（省時間）。
//
// ---------- 階段 3：最終最佳解（時間 O(n*m)，空間 O(m)）----------
var zigZagArrays = function (n, l, r) {
    const MOD = 1000000007n;
    const m = r - l + 1;

    // up[j]   : ending value (l+j), next move must be UP   (== handwork dp[i][U])
    // down[j] : ending value (l+j), next move must be DOWN (== handwork dp[i][D])
    // rolling arrays keep only the current layer -> avoid MLE
    let up = new Array(m).fill(1n);
    let down = new Array(m).fill(1n);

    for (let i = 2; i <= n; i++) {
        const newUp = new Array(m).fill(0n);
        const newDown = new Array(m).fill(0n);

        // jump UP: prefix accumulates while scanning, store into newDown (after up -> next down)
        let prefix = 0n;
        for (let j = 0; j < m; j++) {
            newDown[j] = prefix;
            prefix = (prefix + up[j]) % MOD;
        }

        // jump DOWN: suffix accumulates right-to-left, store into newUp (after down -> next up)
        let suffix = 0n;
        for (let j = m - 1; j >= 0; j--) {
            newUp[j] = suffix;
            suffix = (suffix + down[j]) % MOD;
        }

        up = newUp;
        down = newDown;
    }

    let ans = 0n;
    for (let j = 0; j < m; j++) {
        ans = (ans + up[j] + down[j]) % MOD;
    }
    return Number(ans % MOD);
}
