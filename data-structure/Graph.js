class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) this.adjList.set(vertex, new Set());
    else {
    }
  }

  addEdge(vertex, node) {
    if (this.adjList.has(vertex) && this.adjList.has(node)) {
      const edges = this.adjList.get(vertex);
      edges.set(node);
    } else {
    }
  }

  createVisitedObject() {
    let map = {};
    for (const key of this.adjList.keys()) {
      map[key] = false;
    }

    return map;
  }

  bfs(initialNode, fn) {
    const visited = this.createVisitedObject();

    const queue = [];

    visited[initialNode] = true;

    queue.push(initialNode);

    while (queue.length) {
      const current = queue.shift();
      fn(current);

      const arr = this.adjList.get(current);

      for (let elem of arr) {
        if (!visited[elem]) {
          visited[elem] = true;
          queue.push(elem);
        }
      }
    }
  }

  dfs(initialNode, fn) {
    const visited = this.createVisitedObject();

    const dfsHelper = (node) => {
      visited[node] = true;
      fn(node);

      const arr = this.adjList.get(current);

      for (const elem of arr) {
        if (!visited[elem]) {
          dfsHelper(elem);
        }
      }
    };

    dfsHelper(initialNode);
  }
}
