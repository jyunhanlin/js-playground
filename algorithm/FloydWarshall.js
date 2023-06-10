// find shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles)
// shortestPath(i, j, k) = min (shortestPath(i, j, k - 1), shortestPath(i, k, k - 1) + shortestPath(k, j, k - 1))
// Time complexity: O(n^3)
// Space complexity: O(n^2)

function init(graph) {
  const dist = [];
  const len = graph.length;
  for (let i = 0; i < len; i += 1) {
    dist[i] = [];
    for (let j = 0; j < len; j += 1) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }
  return dist;
}

function floydWarshall(graph) {
  const dist = init(graph);
  const len = graph.length;
  for (let k = 0; k < len; k += 1) {
    for (let i = 0; i < len; i += 1) {
      for (let j = 0; j < len; j += 1) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  return dist;
}
