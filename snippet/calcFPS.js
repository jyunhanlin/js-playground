/**
 * FPS Calculator - 滑動窗口計算每秒幀數
 *
 * 滑動窗口運作圖例:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━►
 *
 * 幀 1: 0ms
 * tasks = [0]
 * |← 1000ms 窗口 →|
 * [0]
 *
 * 幀 2: 16ms  (正常 60 FPS 間隔)
 * tasks = [0, 16]
 * |← 1000ms 窗口 →|
 * [0, 16]
 *
 * 幀 61: 1000ms  (約 60 幀後)
 * tasks = [0, 16, 33, 50, ..., 983, 1000]  // ~60 個元素
 * |← 1000ms 窗口 →|
 * [0 ... 1000]
 * FPS = 60 幀 / 1000ms * 1000 = 60
 *
 * 幀 62: 1016ms
 * filter 移除 0ms (因為 1016 - 0 > 1000)
 * tasks = [16, 33, 50, ..., 983, 1000, 1016]  // 還是 ~60 個
 *     |← 1000ms 窗口 →|
 *     [16 ... 1016]  窗口往右滑動！
 *
 *
 * Lag 檢測圖例:
 *
 * 正常情況 (60 FPS):
 *  ↓   ↓   ↓   ↓   ↓   ↓   每個箭頭 = 一幀
 * 0ms 16  33  50  67  83  間隔 ~16ms ✓
 *
 * 發生 Lag:
 *  ↓   ↓                              ↓   ↓
 * 0ms 16                            1500  1516
 *      └──────────────────────────┘
 *          間隔 1484ms (> 1000ms)
 *          console.log('lag: 1484') ⚠️
 *
 *
 * FPS 計算公式:
 * tasks = [1000, 1016, 1033, ..., 1983, 2000]
 *          ↑                           ↑
 *        tasks[0]              tasks[length-1]
 *
 * time = 2000 - 1000 = 1000ms
 * 幀數 = tasks.length = 60
 * FPS = (60 / 1000) * 1000 = 60
 */

// implement with setTimeout (不推薦：不與瀏覽器刷新率同步)
function calcFPS() {
  let tasks = [Date.now()]; // 時間戳陣列，用於滑動窗口
  let startTime = Date.now(); // 上次輸出 FPS 的時間

  const loop = () => {
    setTimeout(() => {
      const current = Date.now();
      tasks.push(current);

      // 滑動窗口 - 只保留最近 1 秒內的時間戳
      tasks = tasks.filter((time) => current - time <= 1000);

      // 計算窗口內的時間跨度
      const time = tasks[tasks.length - 1] - tasks[0];

      // 每秒輸出一次 FPS
      if (current - startTime > 1000) {
        console.log('fps:', time ? parseInt((tasks.length / time) * 1000) : 0);
        startTime = Date.now();
      }
      loop();
    });
  };
  loop();
}

// implement with requestAnimationFrame (推薦：與瀏覽器刷新率同步)
function calcFPS() {
  let tasks = [Date.now()]; // 時間戳陣列，用於滑動窗口
  let startTime = Date.now(); // 上次輸出 FPS 的時間

  const loop = () => {
    requestAnimationFrame(() => {
      // Step 1: 記錄當前幀的時間戳
      const current = Date.now();
      tasks.push(current);

      // Step 2: Lag 檢測 - 檢查這幀與上一幀的間隔
      const tail = tasks.length - 1;
      if (tasks.length > 1 && tasks[tail] - tasks[tail - 1] > 1000) {
        console.log('lag:', tasks[tail] - tasks[tail - 1]);
      }

      // Step 3: 滑動窗口 - 只保留最近 1 秒內的時間戳
      tasks = tasks.filter((time) => current - time <= 1000);

      // Step 4: 計算窗口內的時間跨度
      const time = tasks[tasks.length - 1] - tasks[0];

      // Step 5: 每秒輸出一次 FPS
      if (current - startTime > 1000) {
        // 公式: (幀數 / 毫秒) * 1000 = 每秒幀數
        console.log('fps:', time ? parseInt((tasks.length / time) * 1000) : 0);
        startTime = Date.now();
      }

      // Step 6: 遞迴呼叫，繼續下一幀
      loop();
    });
  };
  loop();
}
