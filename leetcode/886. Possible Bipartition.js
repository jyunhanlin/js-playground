/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
  let ok = true;

  let color = new Array(graph.length).fill(0);
  let visited = new Array(graph.length).fill(0);

  const graph = new Array(n + 1).fill().map(() => []);
  for (const [v, w] of dislikes) {
    graph[v].push(w);
    graph[w].push(v);
  }

  const traverse = (v, c) => {
    if (!ok) return;

    if (visited[v]) {
      if (color[v] !== c) ok = false;
      return;
    }

    visited[v] = 1;
    color[v] = c;

    for (const w of graph[v]) {
      traverse(w, -c);
    }
  };

  for (let v = 0; v < graph.length; v += 1) {
    if (!visited[v]) {
      traverse(v, 1);
    }
  }

  return ok;
};
// after build graph, it's the same as 785. Is Graph Bipartite?

// time complexity is O(V + E)
// space complexity is O(V)
