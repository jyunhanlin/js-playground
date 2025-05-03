/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
  const n = arr.length;
  const visited = new Array(n).fill(0);
  const queue = [start];

  while (queue.length) {
    const index = queue.shift();
    const value = arr[index];
    if (value === 0) return true;
    visited[index] = 1;
    const right = index + value;
    if (!visited[right] && right < n) queue.push(right);

    const left = index - value;
    if (!visited[left] && left >= 0) queue.push(left);
  }

  return false;
};
