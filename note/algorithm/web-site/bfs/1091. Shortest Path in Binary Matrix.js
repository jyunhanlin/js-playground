/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1) {
    return -1;
  }

  const queue = [];
  const visited = new Array(m).fill().map(() => new Array(n).fill(0));
  queue.push([0, 0]);
  visited[0][0] = 1;

  let pathLen = 1;

  let dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const [x, y] = queue.shift();
      if (x === m - 1 && y === n - 1) {
        return pathLen;
      }
      for (const dir of dirs) {
        let nextX = x + dir[0];
        let nextY = y + dir[1];

        if (
          nextX < 0 ||
          nextX >= m ||
          nextY < 0 ||
          nextY >= n ||
          grid[nextX][nextY] === 1 ||
          visited[nextX][nextY]
        )
          continue;

        queue.push([nextX, nextY]);
        visited[nextX][nextY] = 1;
      }
    }
    pathLen++;
  }
  return -1;
};
