/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryOnTree = function (n, edges, queries) {
  const graph = new Array(n + 1).fill().map(() => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  // BFS;
  const dist = new Array(n + 1).fill(0);
  const visited = new Array(n + 1).fill(0);

  const queue = [1];
  visited[1] = 1;

  while (queue.length) {
    const u = queue.shift();

    for (const [v, w] of graph[u]) {
      if (visited[v]) continue;

      visited[v] = 1;
      dist[v] = dist[u] ^ w;
      queue.push(v);
    }
  }

  const xorCount = new Map();
  for (let i = 1; i <= n; i += 1) {
    xorCount.set(dist[i], (xorCount.get(dist[i]) || 0) + 1);
  }

  const result = [];

  for (const [u, k] of queries) {
    const target = dist[u] ^ k;

    result.push(xorCount.get(target) || 0);
  }

  return result;
};
