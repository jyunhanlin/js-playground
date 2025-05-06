/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const bfs = (queue, visited) => {
    while (queue.length > 0) {
      let [x, y] = queue.shift();
      for (let dir of dirs) {
        const nx = x + dir[0];
        const ny = y + dir[1];

        if (
          nx < 0 ||
          nx >= m ||
          ny < 0 ||
          ny >= n ||
          visited[nx][ny] ||
          heights[nx][ny] < heights[x][y]
        ) {
          continue;
        }
        queue.push([nx, ny]);
        visited[nx][ny] = 1;
      }
    }
  };

  const visitedP = Array.from({ length: m }, () => Array(n).fill(0));
  const queueP = [];
  for (let i = 0; i < m; i += 1) {
    queueP.push([i, 0]);
    visitedP[i][0] = 1;
  }
  for (let j = 1; j < n; j += 1) {
    queueP.push([0, j]);
    visitedP[0][j] = 1;
  }
  bfs(queueP, visitedP);

  const visitedA = Array.from({ length: m }, () => Array(n).fill(0));
  const queueA = [];
  for (let i = 0; i < m; i++) {
    queueA.push([i, n - 1]);
    visitedA[i][n - 1] = 1;
  }
  for (let j = 0; j < n - 1; j++) {
    queueA.push([m - 1, j]);
    visitedA[m - 1][j] = 1;
  }

  bfs(queueA, visitedA);

  const res = [];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (visitedP[i][j] && visitedA[i][j]) {
        res.push([i, j]);
      }
    }
  }
  return res;
};
