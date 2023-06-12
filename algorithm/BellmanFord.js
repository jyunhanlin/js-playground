// find shortest paths from a single source vertex to all of the other vertices in a weighted digraph.
// slower than Dijkstra's algorithm
// handle graphs in which some of the edge weights are negative numbers.

// Time complexity: O(|V||E|)
// Space complexity: O(|V|)

/**
 * @param {number} vertexNumber
 * @param {array} edges (u -> v, the weight is w)
 * @param {number} startVertex
 * @return {array} dist
 */
const BellmanFord = (vertexNumber, edges, startVertex) => {
  const dist = new Array(vertexNumber - 1).fill(Infinity);
  dist[startVertex] = 0;

  for (let i = 0; i < vertexNumber - 1; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  // nth relaxation to check negative cycle
  for (let [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return [-1];
    }
  }

  return dist;
};
