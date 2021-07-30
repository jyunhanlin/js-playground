/**
 * Concept:
 * 利用DFS或是BFS 將為 '1' 的值變為 '0'
 * 計算DFS或BFS的使用次數
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length;
  if (m === 0) return 0;

  const n = grid[0].length;
  if (n === 0) return 0;

  let count = 0;

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === '1') {
        flipDFS(grid, i, j);
        count++;
      }
    }
  }

  return count;
};

const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

const flipDFS = (grid, row, column) => {
  if (
    row < 0 ||
    column < 0 ||
    row >= grid.length ||
    column >= grid[0].length ||
    grid[row][column] === '0'
  )
    return;

  grid[row][column] = '0';

  for (let i = 0; i < directions.length; i++) {
    const currentDir = directions[i];
    flipDFS(grid, row + currentDir[0], column + currentDir[1]);
  }
};

const flipBFS = (grid, startRow, startColumn) => {
  const queue = [];
  queue.push([startRow, startColumn]);

  while (queue.length) {
    const currentPos = queue.shift();
    const row = currentPos[0];
    const col = currentPos[1];

    grid[row][col] = '0';

    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];
      const nextRow = row + currentDir[0];
      const nextColumn = col + currentDir[1];

      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextColumn < 0 ||
        nextColumn >= grid[0].length ||
        grid[nextRow][nextColumn] === '0'
      ) {
        continue;
      }

      queue.push([nextRow, nextColumn]);
    }
  }
};
