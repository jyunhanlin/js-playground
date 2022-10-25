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

const testMatrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

const traversalDFS2 = function (matrix) {
  const seen = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(false));

  const values = [];

  dfs(matrix, 0, 0, seen, values);

  return values;
};

const dfs = function (matrix, row, col, seen, values) {
  if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[0].length || seen[row][col])
    return;

  seen[row][col] = true;
  values.push(matrix[row][col]);

  for (let i = 0; i < directions.length; i++) {
    const currentDir = directions[i];
    dfs(matrix, row + currentDir[0], col + currentDir[1], seen, values);
  }
};

console.log(traversalDFS2(testMatrix));
