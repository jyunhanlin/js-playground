/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function(grid, health) {
    const m = grid.length;
    const n = grid[0].length;

    // dist[r][c] = 走到格子 (r, c) 時「最少累積扣掉的血量」
    // 初始全部設為 Infinity，代表尚未拜訪
    const dist = new Array(m).fill().map(() => new Array(n).fill(Infinity));

    // 四個移動方向：下、右、上、左
    const DIRs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    // 起點本身也可能是 1，所以初始扣血量就是 grid[0][0]（不能設成 0）
    dist[0][0] = grid[0][0];

    // 這裡用普通陣列模擬雙端佇列 (deque) 來做 0-1 BFS
    const dequeue = [[0, 0]];

    while (dequeue.length) {
        // 從佇列前端取出目前扣血量最小的格子
        const [r, c] = dequeue.shift();

        for (const [x, y] of DIRs) {
            const nr = r + x;
            const nc = c + y;

            // 越界就跳過
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

            // 進入鄰格的成本 = 目前扣血量 + 鄰格的值（1 扣血、0 不扣血）
            const cost = dist[r][c] + grid[nr][nc];

            // 找到更小的扣血路徑才更新
            if (cost < dist[nr][nc]) {
                dist[nr][nc] = cost;

                // 0-1 BFS 核心：邊權 0 塞前端(優先)、邊權 1 塞後端
                if (grid[nr][nc] === 0) dequeue.unshift([nr, nc]);
                else dequeue.push([nr, nc]);
            }
        }
    }

    // 到達終點的最小扣血量嚴格小於初始血量，才能保證血量 >= 1
    return dist[m - 1][n - 1] < health;
};

// time complexity: O(mn);
// space complexity: O(mn);
