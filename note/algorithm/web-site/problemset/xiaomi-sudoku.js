var countSudokuSolutions = function (grid) {
  const used = new Array(10).fill(0);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] !== 0) {
        if (used[grid[i][j]]) return 0;
        used[grid[i][j]] = 1;
      }
    }
  }
  let count = 0;
  function backtrack(pos) {
    if (pos === 9) {
      count += 1;
      return;
    }
    const i = Math.floor(pos / 3);
    const j = pos % 3;
    if (grid[i][j] !== 0) {
      backtrack(pos + 1);
      return;
    }
    for (let num = 1; num <= 9; num++) {
      if (used[num]) continue;
      if (!isValid(i, j, num)) continue;

      grid[i][j] = num;
      used[num] = 1;
      backtrack(pos + 1);
      grid[i][j] = 0;
      used[num] = 0;
    }
  }

  function isValid(i, j, num) {
    const DIR = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [u, v] of DIR) {
      const ni = i + u;
      const nj = j + v;
      if (ni < 0 || ni >= 3 || nj < 0 || nj >= 3) continue;

      if (grid[ni][nj] !== 0 && Math.abs(grid[ni][nj] - num) === 1) return false;
    }

    return true;
  }

  backtrack(0);
  return count;
};
