/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let res = 0;
  const board = [];

  for (let i = 0; i < n; i += 1) {
    board.push('.'.repeat(n));
  }

  const isValid = (row, col) => {
    for (let i = 0; i < row; i += 1) {
      if (board[i][col] === 'Q') return false;
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      res += 1;
      return;
    }

    for (let col = 0; col < n; col += 1) {
      if (!isValid(row, col)) continue;

      const newRow = board[row].split('');
      newRow[col] = 'Q';
      board[row] = newRow.join('');
      backtrack(row + 1);
      newRow[col] = '.';
      board[row] = newRow.join('');
    }
  };

  backtrack(0);

  return res;
};
