const adjacencyMatrix = [
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
];

const traversalDFS = function (vertex, graph, values, seen) {
  values.push(vertex);
  seen[vertex] = true;

  const connections = graph[vertex];
  for (let v = 0; v < connections.length; v++) {
    if (connections[v] > 0 && !seen[v]) {
      traversalDFS(v, graph, values, seen);
    }
  }
};

const values = [];
traversalDFS(0, adjacencyMatrix, values, {});

console.log(values);

const traversalBFS = function (graph) {
  const seen = {};
  const queue = [0];
  const values = [];

  while (queue.length) {
    const vertex = queue.shift();

    values.push(vertex);
    seen[vertex] = true;

    const connections = graph[vertex];
    for (let v = 0; v < connections.length; v++) {
      if (connections[v] > 0 && !seen[v]) {
        queue.push(v);
      }
    }
  }

  return values;
};

console.log(traversalBFS(adjacencyMatrix));
