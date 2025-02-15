/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const m = board.length;
  const n = board[0].length;

  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return;

    if (board[i][j] !== 'O') return;

    board[i][j] = '#';

    dfs(i + 1, j);
    dfs(i, j + 1);
    dfs(i - 1, j);
    dfs(i, j - 1);
  };

  for (let i = 0; i < m; i += 1) {
    dfs(i, 0);
    dfs(i, n - 1);
  }

  for (let j = 0; j < n; j += 1) {
    dfs(0, j);
    dfs(m - 1, j);
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      }

      if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }

  return board;
};
