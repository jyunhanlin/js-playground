/**
 * @param {number[][]} grid
 * @return {number}
 */

const DIR = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

var maxAreaOfIsland = function (grid) {
  let max = 0;
  let curArea = 0;

  const dfs = (i, j) => {
    if (grid[i][j] === 1) {
      grid[i][j] = 0;
      curArea += 1;
    }

    for (let k = 0; k < 4; k += 1) {
      const nextI = i + DIR[k][0];
      const nextJ = j + DIR[k][1];

      if (nextI < 0 || nextI >= grid.length || nextJ < 0 || nextJ >= grid[0].length) continue;
      if (grid[nextI][nextJ] === 1) dfs(nextI, nextJ);
    }
  };

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[0].length; j += 1) {
      if (grid[i][j] === 1) {
        curArea = 0;
        dfs(i, j);

        max = Math.max(max, curArea);
      }
    }
  }

  return max;
};
