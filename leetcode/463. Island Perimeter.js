/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  const rowLen = grid.length;
  const colLen = grid[0].length;

  const countPerimeter = (i, j) => {
    let perimeter = 4;

    if (j > 0 && grid[i][j - 1] === 1) perimeter--;
    if (j < colLen - 1 && grid[i][j + 1] === 1) perimeter--;
    if (i > 0 && grid[i - 1][j] === 1) perimeter--;
    if (i < rowLen - 1 && grid[i + 1][j] === 1) perimeter--;

    return perimeter;
  };

  let res = 0;

  for (let i = 0; i < rowLen; i += 1) {
    for (let j = 0; j < colLen; j += 1) {
      if (grid[i][j] === 1) res += countPerimeter(i, j);
    }
  }

  return res;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  var perimeter = 0;

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      if (!grid[row][col]) continue;

      perimeter += 4;

      // abstract the number of adjacent island
      if (row > 0 && grid[row - 1][col]) perimeter--;
      if (col > 0 && grid[row][col - 1]) perimeter--;
      if (row < rows - 1 && grid[row + 1][col]) perimeter--;
      if (col < cols - 1 && grid[row][col + 1]) perimeter--;
    }
  }

  return perimeter;
};
