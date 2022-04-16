/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const result = Array(mat.length)
    .fill(null)
    .map(() => Array(mat[0].length).fill(Infinity));

  const queue = [];

  for (let i = 0; i < mat.length; i += 1) {
    for (let j = 0; j < mat[0].length; j += 1) {
      if (mat[i][j] === 0) {
        result[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    const pos = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const newPosI = pos[0] + DIR[i][0];
      const newPosJ = pos[1] + DIR[i][1];

      if (newPosI < 0 || newPosI >= mat.length || newPosJ < 0 || newPosJ >= mat[0].length) continue;

      if (result[newPosI][newPosJ] === Infinity) {
        result[newPosI][newPosJ] = result[pos[0]][pos[1]] + 1;

        queue.push([newPosI, newPosJ]);
      }
    }
  }

  return result;
};

const DIR = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
