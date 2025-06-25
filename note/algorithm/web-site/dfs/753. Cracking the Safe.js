/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var crackSafe = function (n, k) {
  // if (n === 1) {
  //     const res = [];
  //     for (let i = 0; i < k; i++) {
  //         res.push(i);
  //     }
  //     return res.join('');
  // }

  const visited = new Set();
  const start = '0'.repeat(n - 1);

  const result = [];
  const traverse = (node) => {
    for (let i = 0; i < k; i += 1) {
      const nextNode = node + `${i}`;
      if (visited.has(nextNode)) continue;
      visited.add(nextNode);
      traverse(nextNode.slice(1));
      result.push(i);
    }
  };

  traverse(start);

  result.push(start);

  return result.join('');
};
