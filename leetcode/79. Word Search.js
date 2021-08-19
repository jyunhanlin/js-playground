/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let found = false;

  const dfs = (row, col, count, word) => {
    if (count === word.length) {
      found = true;
      return;
    }

    if (
      row < 0 ||
      row >= board.length ||
      col < 0 ||
      col > board[0].length ||
      board[row][col] !== word[count] ||
      found
    )
      return;

    let temp = board[row][col];

    board[row][col] = '';

    for (let i = 0; i < directions.length; i += 1) {
      const dir = directions[i];
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];

      dfs(nextRow, nextCol, count + 1, word);
    }

    board[row][col] = temp;
  };

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[0].length; col += 1) {
      if (board[row][col] === word[0]) {
        dfs(row, col, 0, word);
      }
    }
  }

  return found;
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
