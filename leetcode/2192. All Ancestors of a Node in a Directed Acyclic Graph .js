/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // build graph
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[v].push(u);
  }

  const memo = Array.from({ length: n }, () => []);

  const dfs = (node, visited) => {
    if (visited[node]) return;

    if (memo[node].length) return;

    visited[node] = 1;

    for (const neighbor of graph[node]) {
      dfs(neighbor, visited);
    }

    const set = new Set();
    for (const neighbor of graph[node]) {
      set.add(neighbor);
      memo[neighbor].forEach((el) => {
        set.add(el);
      });
    }

    memo[node].push(...Array.from(set).sort((a, b) => a - b));
  };

  for (let i = 0; i < n; i += 1) {
    const visited = new Array(n).fill(0);
    dfs(i, visited);
  }

  return memo;
};

// time complexity: O(n^2)
// space complexity: O(n)
