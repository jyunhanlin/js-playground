/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function (n, edges, hasApple) {
  const graph = new Map();
  const visited = new Set();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [parent, child] of edges) {
    graph.get(parent).push(child);
    graph.get(child).push(parent);
  }

  const collect = (node) => {
    if (visited.has(node)) return -1;
    visited.add(node);

    let sum = 0;

    for (const child of graph.get(node)) {
      const subTime = collect(child);

      if (subTime !== -1) sum += subTime + 2;
    }

    if (sum > 0) return sum;

    if (sum === 0 && hasApple[node]) return 0;

    return -1;
  };

  const res = collect(0);

  return res === -1 ? 0 : res;
};
