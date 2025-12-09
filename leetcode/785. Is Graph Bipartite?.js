/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let ok = true;

  let color = new Array(graph.length).fill(0);
  let visited = new Array(graph.length).fill(0);

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

// time complexity: O(V + E)
// space complexity: O(V)

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let ok = true;

  let color = new Array(graph.length).fill(0);
  let visited = new Array(graph.length).fill(0);

  const bfs = (start) => {
    const queue = [];
    visited[start] = 1;
    color[start] = 1;
    queue.push(start);

    while (queue.length && ok) {
      const v = queue.shift();

      for (const w of graph[v]) {
        if (!visited[w]) {
          color[w] = -color[v];
          visited[w] = 1;
          queue.push(w);
        } else {
          if (color[w] === color[v]) {
            ok = false;
            return;
          }
        }
      }
    }
  };

  for (let v = 0; v < graph.length; v += 1) {
    if (!visited[v]) {
      bfs(v);
    }
  }

  return ok;
};

// time complexity: O(V + E)
// space complexity: O(V)
