/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function (grid, health) {
    const m = grid.length;
    const n = grid[0].length;
    const dist = new Array(m).fill().map(() => new Array(n).fill(Infinity));
    const DIRs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    dist[0][0] = grid[0][0];
    const dequeue = [[0, 0]];

    while (dequeue.length) {
        const [r, c] = dequeue.shift();
        for (const [x, y] of DIRs) {
            const nr = r + x;
            const nc = c + y;

            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

            const cost = dist[r][c] + grid[nr][nc];
            if (cost < dist[nr][nc]) {
                dist[nr][nc] = cost;
                if (grid[nr][nc] === 0) dequeue.unshift([nr, nc]);
                else dequeue.push([nr, nc]);
            }
        }
    }

    return dist[m - 1][n - 1] < health
};

// time complexity: O(mn);
// space complexity: O(mn);
