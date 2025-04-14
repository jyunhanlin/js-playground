/**
 * @param {number[]} parents
 * @return {number}
 */
var countHighestScoreNodes = function (parents) {
  const n = parents.length;
  const tree = new Array(n).fill().map(() => [-1, -1]);

  for (let i = 1; i < n; i += 1) {
    const parent = parents[i];

    if (tree[parent][0] === -1) tree[parent][0] = i;
    else tree[parent][1] = i;
  }

  const scoreMap = new Map();
  let max = 0;

  const countNode = (node) => {
    if (node === -1) return 0;
    const left = countNode(tree[node][0]);
    const right = countNode(tree[node][1]);

    const other = n - left - right - 1;

    const score = Math.max(left, 1) * Math.max(right, 1) * Math.max(other, 1);

    scoreMap.set(score, (scoreMap.get(score) || 0) + 1);
    max = Math.max(max, score);

    return left + right + 1;
  };

  countNode(0);

  return scoreMap.get(max);
};
