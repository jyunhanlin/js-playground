/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let found = false;
  const m = board.length;
  const n = board[0].length;

  const visited = new Set();
  const dfs = (i, j, p) => {
    if (p === word.length) {
      found = true;
      return;
    }
    if (found) {
      return;
    }
    if (i < 0 || j < 0 || i >= m || j >= n) {
      return;
    }
    if (board[i][j] !== word.charAt(p)) {
      return;
    }

    const key = `${i}-${j}`;
    if (visited.has(key)) return;

    // board[i][j] = String.fromCharCode(-board[i][j].charCodeAt(0));
    visited.add(key);
    dfs(i + 1, j, p + 1);
    dfs(i, j + 1, p + 1);
    dfs(i - 1, j, p + 1);
    dfs(i, j - 1, p + 1);
    visited.delete(key);
    // board[i][j] = String.fromCharCode(-board[i][j].charCodeAt(0));
  };

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (board[i][j] === word[0]) {
        dfs(i, j, 0);

        if (found) return true;
      }
    }
  }

  return false;
};
