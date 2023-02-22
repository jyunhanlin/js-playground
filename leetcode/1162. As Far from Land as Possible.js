/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  const n = grid.length;

  let res = -1;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === 0) {
        // BFS - find nearest 1
        const queue = [[i, j]];
        const visited = {};
        visited[`${i}-${j}`] = 1;

        while (queue.length && queue.length <= n * n) {
          const cell = queue.shift();
          const ci = cell[0];
          const cj = cell[1];

          visited[`${ci}-${cj}`] = 1;

          for (let d = 0; d < DIR.length; d += 1) {
            const newCi = ci + DIR[d][0];
            const newCj = cj + DIR[d][1];

            if (newCi < 0 || newCi >= n || newCj < 0 || newCj >= n) continue;

            if (visited[`${newCi}-${newCj}`]) continue;

            if (grid[newCi][newCj] === 0) queue.push([newCi, newCj]);
            else if (grid[newCi][newCj] === 1) {
              res = Math.max(res, Math.abs(i - newCi) + Math.abs(j - newCj));
              break;
            }
          }
        }
      }
    }
  }
  return res;
};

const DIR = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

var maxDistance = function (grid) {
  let queue = [];
  let containsZero = false;
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      if (grid[row][column] === 1) {
        queue.push([row, column, 0]);
      } else {
        containsZero = true;
      }
    }
  }
  if (queue.length === 0 || !containsZero) {
    return -1;
  }

  let maxDis = -1;
  let direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  while (queue.length > 0) {
    let cell = queue.shift();
    maxDis = Math.max(maxDis, cell[2]);
    for (let i = 0; i < direction.length; i++) {
      let x = direction[i][0] + cell[0];
      let y = direction[i][1] + cell[1];
      if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0) {
        queue.push([x, y, cell[2] + 1]);
        grid[x][y] = 1;
      }
    }
  }
  return maxDis;
};
