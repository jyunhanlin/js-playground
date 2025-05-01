/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumMoves = function (grid) {
  let minMove = Infinity;

  let trackMove = 0;

  const redundant = [];
  const empty = [];
  let emptyCount = 0;

  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] > 1) redundant.push([i, j]);
      else if (grid[i][j] === 0) empty.push([i, j]);
    }
  }

  emptyCount = empty.length;

  const backtrack = () => {
    if (emptyCount === 0) {
      minMove = Math.min(minMove, trackMove);
      return;
    }

    for (const [srcX, srcY] of redundant) {
      if (grid[srcX][srcY] === 1) continue;

      for (const [destX, destY] of empty) {
        if (grid[destX][destY] !== 0) continue;

        const step = Math.abs(srcX - destX) + Math.abs(srcY - destY);

        grid[destX][destY] = 1;
        grid[srcX][srcY]--;
        trackMove += step;
        emptyCount--;
        backtrack();
        grid[destX][destY] = 0;
        grid[srcX][srcY]++;
        trackMove -= step;
        emptyCount++;
      }
    }
  };

  backtrack();

  return minMove;
};
