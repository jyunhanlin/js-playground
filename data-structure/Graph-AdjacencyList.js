const adjacencyList = [[1, 3], [0], [3, 8], [0, 2, 4, 5], [3, 6], [3], [4, 7], [6], [2]];

const dfs = (vertex, graph, seen, values) => {
  seen[vertex] = true;
  values.push(vertex);

  const connections = graph[vertex];

  for (let i = 0; i < connections.length; i += 1) {
    const connection = connections[i];

    if (!seen[connection]) dfs(connection, graph, seen, values);
  }
};

const values = [];
dfs(0, adjacencyList, {}, values);
console.log(values);
// [0, 1, 3, 2, 8, 4, 6, 7, 5]

const bfs = (graph) => {
  const values = [];
  const queue = [0];
  const seen = {};

  while (queue.length) {
    const node = queue.shift();
    values.push(node);

    seen[node] = true;

    const connections = graph[node];

    for (let i = 0; i < connections.length; i += 1) {
      const connection = connections[i];

      if (!seen[connection]) queue.push(connection);
    }
  }

  return values;
};

//[0, 1, 3, 2, 4, 5, 8, 6, 7]
console.log(bfs(adjacencyList));
