/**
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
var minimizeTheDifference = function (mat, target) {
  const m = mat.length;
  const n = mat[0].length;

  let dp = new Set(mat[0]);

  for (let i = 1; i < m; i += 1) {
    const current = new Set();
    let min = Infinity;

    for (let j = 0; j < n; j += 1) {
      for (const num of dp) {
        const sum = num + mat[i][j];

        if (sum < min) {
          current.add(sum);

          if (sum >= target) {
            current.delete(min);
            min = sum;
          }
        }
      }
    }
    dp = current;
  }

  let i = 0;
  while (true) {
    if (dp.has(target + i) || dp.has(target - i)) {
      break;
    }

    i += 1;
  }

  return i;
};
