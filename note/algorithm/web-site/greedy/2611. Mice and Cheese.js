/**
 * @param {number[]} reward1
 * @param {number[]} reward2
 * @param {number} k
 * @return {number}
 */
var miceAndCheese = function (reward1, reward2, k) {
  const n = reward1.length;

  const diff = Array.from({ length: n }, () => Array(2));
  for (let i = 0; i < n; i++) {
    diff[i][0] = reward1[i] - reward2[i];
    diff[i][1] = i;
  }

  diff.sort((a, b) => b[0] - a[0]);
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += reward1[diff[i][1]];
  }

  for (let i = k; i < n; i++) {
    sum += reward2[diff[i][1]];
  }
  return sum;
};
