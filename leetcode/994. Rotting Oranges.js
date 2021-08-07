/**
 * Concept:
 * 1. 先找到爛橘子的位置，以及紀錄新鮮橘子的個數
 * 2. BFS之前要先記錄當前queue的長度 -> 表示同個層級的爛橘子
 * 3. BFS -> 新鮮橘子變成爛橘子 -> 新鮮橘子的個數減1
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  if (grid.length === 0) return 0;

  let fresh = 0;
  const queue = [];
  let mins = 0;

  const m = grid.length;
  const n = grid[0].length;

  for (let row = 0; row < m; row += 1) {
    for (let col = 0; col < n; col += 1) {
      const orange = grid[row][col];

      if (orange === 1) fresh++;

      if (orange === 2) queue.push([row, col]);
    }
  }

  let currentQueueLength = queue.length;

  while (queue.length) {
    if (currentQueueLength === 0) {
      currentQueueLength = queue.length;
      mins++;
    }

    currentQueueLength--;

    const rotten = queue.shift();
    const rottenRow = rotten[0];
    const rottenCol = rotten[1];

    for (let i = 0; i < 4; i += 1) {
      const dirPos = directions[i];
      const newRottenRow = rottenRow + dirPos[0];
      const newRottenCol = rottenCol + dirPos[1];
      if (
        newRottenRow < 0 ||
        newRottenRow >= grid.length ||
        newRottenCol < 0 ||
        newRottenCol >= grid[0].length
      ) {
        continue;
      }

      if (grid[newRottenRow][newRottenCol] === 1) {
        queue.push([newRottenRow, newRottenCol]);
        grid[newRottenRow][newRottenCol] = 2;

        fresh--;
      }
    }
  }

  if (fresh !== 0) return -1;

  return mins;
};

const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];
