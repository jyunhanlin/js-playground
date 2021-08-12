/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const n = board.length;
  const block = new Array(n).fill(0).map(() => ({}));
  const row = new Array(n).fill(0).map(() => ({}));
  const column = new Array(n).fill(0).map(() => ({}));

  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      if (board[r][c] !== '.') {
        const val = board[r][c];
        block[getBlockId(r, c)][val] = 1;
        row[r][val] = 1;
        column[c][val] = 1;
      }
    }
  }

  solver(board, block, row, column, 0, 0);
};

const getBlockId = (r, c) => Math.floor(r / 3) * 3 + Math.floor(c / 3);

const isValidSudoku = (block, row, column, r, c, val) =>
  !block[getBlockId(r, c)][val] && !row[r][val] && !column[c][val];

const solver = (board, block, row, column, r, c) => {
  const n = board.length;
  if (r === n || c === n) return true;

  if (board[r][c] === '.') {
    for (let i = 1; i < 10; i += 1) {
      board[r][c] = i.toString();
      if (isValidSudoku(block, row, column, r, c, i)) {
        block[getBlockId(r, c)][i] = 1;
        row[r][i] = 1;
        column[c][i] = 1;

        if (c === n - 1) {
          if (solver(board, block, row, column, r + 1, 0)) {
            return true;
          }
        } else {
          if (solver(board, block, row, column, r, c + 1)) {
            return true;
          }
        }

        block[getBlockId(r, c)][i] = 0;
        row[r][i] = 0;
        column[c][i] = 0;
      }

      board[r][c] = '.';
    }
  } else {
    if (c === n - 1) {
      if (solver(board, block, row, column, r + 1, 0)) {
        return true;
      }
    } else {
      if (solver(board, block, row, column, r, c + 1)) {
        return true;
      }
    }
  }

  return false;
};
