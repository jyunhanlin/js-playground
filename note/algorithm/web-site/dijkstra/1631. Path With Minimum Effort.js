/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const m = heights.length;
  const n = heights[0].length;
  const dp = new Array(m).fill().map(() => new Array(n).fill(Infinity));
  const pq = new MinPriorityQueue((a) => a[2]);
  dp[0][0] = 0;
  pq.enqueue([0, 0, 0]);

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  while (!pq.isEmpty()) {
    const [x, y, effort] = pq.dequeue();

    if (x === m - 1 && y === n - 1) return effort;
    if (effort > dp[x][y]) continue;

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= m || nx < 0 || ny >= n || ny < 0) continue;

      const newEffort = Math.max(dp[x][y], Math.abs(heights[x][y] - heights[nx][ny]));
      if (dp[nx][ny] > newEffort) {
        dp[nx][ny] = newEffort;
        pq.enqueue([nx, ny, newEffort]);
      }
    }
  }

  return -1;
};
