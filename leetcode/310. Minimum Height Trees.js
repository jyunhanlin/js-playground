/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0];

  // build graph
  const graph = Array(n)
    .fill()
    .map(() => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // bfs from the leaves, like peeling the onion
  const queue = [];
  for (let i = 0; i < n; i += 1) {
    if (graph[i].length === 1) queue.push(i);
  }

  let nodeCount = n;
  while (nodeCount > 2) {
    const size = queue.length;
    nodeCount -= size;
    for (let i = 0; i < size; i += 1) {
      const cur = queue.shift();

      for (const neighbor of graph[cur]) {
        graph[neighbor] = graph[neighbor].filter((n) => n !== cur);
        if (graph[neighbor].length === 1) {
          queue.push(neighbor);
        }
      }
    }
  }

  return queue;
};

// time complexity: O(n)
// space complexity: O(n)
