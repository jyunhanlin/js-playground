// ============================================================
//  承接 3699（ZigZag I）：同一條遞推式
//    newDown[y] = sum(up[x])   for x < y   => up 的前綴和
//    newUp[y]   = sum(down[x]) for x > y   => down 的後綴和
//  3699 逐層掃前綴/後綴和，時間 O(n * m)。
//  本題（II）的 n 可達 ~1e9，O(n * m) 會 TLE。
//
//  心法：每一層的轉移都「線性且長得一樣」-> 可寫成一個固定的轉移矩陣 T，
//        第 n 層 = T^(n-1) 作用在初始向量上；用矩陣快速冪把 n 壓成 O(log n)。
//        時間 O(m^3 * log n)，空間 O(m^2)。
//
//  狀態向量 v 長度 sz = 2m：
//    v[0   .. m-1 ] = up[x]    結尾值 (l + x)，下一步往上 (UP)
//    v[m   .. 2m-1] = down[x]  結尾值 (l + x)，下一步往下 (DOWN)
//  轉移矩陣 T[輸出列][輸入行]：
//    T[y    ][m + x] = 1 (x > y)  => newUp[y]   收集 down[x]
//    T[m + y][x    ] = 1 (x < y)  => newDown[y] 收集 up[x]
// ============================================================

/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
  const MOD = BigInt(1e9 + 7);
  const m = r - l + 1;
  // 長度 1：每個結尾值各算一種（初始向量會把 up/down 各記一次，故單獨處理避免重複計數）
  if (n === 1) return Number(BigInt(m) % MOD);

  const sz = 2 * m;

  // sz x sz 的全零矩陣，T / 單位矩陣 / 乘積暫存共用同一個初始化方式
  const zeros = () => new Array(sz).fill().map(() => new Array(sz).fill(0n));

  // 轉移矩陣 T
  const T = zeros();
  for (let y = 0; y < m; y += 1) {
    // 往下跳到 y 之後下一步往上：newUp[y] = sum(down[x]) for x > y
    for (let x = y + 1; x < m; x += 1) T[y][m + x] = 1n;
  }
  for (let y = 0; y < m; y += 1) {
    // 往上跳到 y 之後下一步往下：newDown[y] = sum(up[x]) for x < y
    for (let x = 0; x < y; x += 1) T[m + y][x] = 1n;
  }

  // 矩陣相乘 (mod MOD)，A 元素為 0 時整列略過 -> T 稀疏，加速明顯
  const mul = (A, B) => {
    const C = zeros();
    for (let i = 0; i < sz; i += 1) {
      const Ai = A[i];
      const Ci = C[i];
      for (let k = 0; k < sz; k += 1) {
        const a = Ai[k];
        if (a === 0n) continue;
        const Bk = B[k];
        for (let j = 0; j < sz; j += 1) Ci[j] = (Ci[j] + a * Bk[j]) % MOD;
      }
    }
    return C;
  };

  // 快速冪：R = T^(n-1)，R 由單位矩陣起算
  let R = zeros();
  for (let i = 0; i < sz; i += 1) R[i][i] = 1n;

  let base = T;
  let e = n - 1;
  while (e > 0) {
    if (e & 1) R = mul(R, base);
    e = Math.floor(e / 2);
    if (e > 0) base = mul(base, base);
  }

  // 初始向量每格皆為 1（長度 1 的陣列任何結尾、任何方向都算一種），
  // 故答案 = T^(n-1) 全部元素總和
  let ans = 0n;
  for (let i = 0; i < sz; i += 1) {
    for (let j = 0; j < sz; j += 1) {
      ans = (ans + R[i][j]) % MOD;
    }
  }
  return Number(ans);
};

// time complexity: O(m^3 * log n)
// space complexity: O(m^2)
