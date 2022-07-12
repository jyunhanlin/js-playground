/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (numRows === 1) return [[1]];
  const result = [[1], [1, 1]];

  for (let i = 2; i < numRows; i += 1) {
    const lastRow = result[i - 1];

    const np1 = [...lastRow, 0];
    const np2 = [0, ...lastRow];

    result.push(np1.map((p1, idx) => p1 + np2[idx]));
  }

  return result;
};
