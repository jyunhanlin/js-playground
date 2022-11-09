/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function (mat) {
  const m = mat.length;
  const n = mat[0].length;

  const helper = (a, b) => {
    let count = 0;
    let bound = n;

    for (let i = a; i < m; i++) {
      for (let j = b; j < bound; j++) {
        if (mat[i][j]) count += 1;
        else bound = j;
      }
    }

    return count;
  };

  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      count += helper(i, j);
    }
  }

  return count;
};
