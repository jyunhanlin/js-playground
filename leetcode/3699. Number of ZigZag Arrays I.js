// ===================== 思路演進 =====================
// 狀態: dp[i][dir][j] = 長度 i、結尾值 (l+j)、下一步方向 dir
//        dir = 0 -> 下一步往下,  dir = 1 -> 下一步往上
//
// 階段 0: 樸素三維 DP (會 TLE + MLE)
//   for(i) for(j) { for(k<j) up方向累加; for(k>j) down方向累加 }
//   MLE: dp 開了 n*2*m 大小   |   TLE: 內層 for k 讓複雜度 O(n*m^2)
//
// 階段 1: 砍掉 i 維度 -> 解決 MLE
//   算 dp[i] 只用到 dp[i-1],更早的層用不到,故只留兩層滾動。
//   空間 O(n*m) -> O(m)。 但仍 O(n*m^2),還是 TLE。
//
// 階段 2: 砍掉 k 迴圈 -> 解決 TLE
//   往上跳到 j = sum(up[k]) for k<j  ==> up 的前綴和 -> newDown
//   往下跳到 j = sum(down[k]) for k>j ==> down 的後綴和 -> newUp
//   每層 O(m^2) -> O(m)。 時間 O(n*m^2) -> O(n*m)。
//
// 心法: 只被下一層用到的維度可滾動掉(省空間);
//       表現為對連續區間求和的維度可前綴和掉(省時間)。
//
// 階段 3: 最終解 (時間 O(n*m), 空間 O(m)) 如下
// ===================================================
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
