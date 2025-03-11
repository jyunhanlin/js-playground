/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const queue = new MinPriorityQueue((a) => a[0]);

  for (let i = 0; i < matrix.length; i += 1) {
    queue.enqueue([matrix[i][0], i, 0]);
  }

  let res = -1;
  let curK = 0;
  while (queue.size()) {
    const [val, i, j] = queue.dequeue();

    res = val;
    curK += 1;

    if (curK === k) break;

    if (matrix[i][j + 1] !== undefined) queue.enqueue([matrix[i][j + 1], i, j + 1]);
  }

  return res;
};
