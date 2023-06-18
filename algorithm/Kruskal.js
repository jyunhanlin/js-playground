// finds a minimum spanning forest of an undirected edge-weighted graph.

// 1. create a forest F (a set of trees), where each vertex in the graph is a separate tree
// 2. create a sorted set S containing all the edges in the graph
// 3. while S is nonempty and F is not yet spanning
//   3.1. remove an edge with minimum weight from S
//   3.2. if the removed edge connects two different trees then add it to the forest F, combining two trees into a single tree

// Time complexity: O(E log E) = O(E log V).

class UnionFind {
  constructor(elements) {
    // Number of disconnected components
    this.count = elements.length;

    // Keep Track of connected components
    this.parent = {};

    // Initialize the data structure such that all
    // elements have themselves as parents
    elements.forEach((e) => (this.parent[e] = e));
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    // Roots are same so these are already connected.
    if (rootA === rootB) return;

    // Always make the element with smaller root the parent.
    if (rootA < rootB) {
      if (this.parent[b] != b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] != a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  // Returns final parent of a node
  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  // Checks connectivity of the 2 nodes
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

let uf = new UnionFind(['A', 'B', 'C', 'D', 'E']);
uf.union('A', 'B');
uf.union('A', 'C');
uf.union('C', 'D');

console.log(uf.connected('B', 'E')); // false
console.log(uf.connected('B', 'D')); // true

function Kruskal() {
  // Initialize graph that'll contain the MST
  const MST = new Graph();
  this.nodes.forEach((node) => MST.addNode(node));
  if (this.nodes.length === 0) {
    return MST;
  }

  // Create a Priority Queue
  edgeQueue = new PriorityQueue(this.nodes.length * this.nodes.length);

  // Add all edges to the Queue:
  for (let node in this.edges) {
    this.edges[node].forEach((edge) => {
      edgeQueue.enqueue([node, edge.node], edge.weight);
    });
  }

  let uf = new UnionFind(this.nodes);

  // Loop until either we explore all nodes or queue is empty
  while (!edgeQueue.isEmpty()) {
    // Get the edge data using destructuring
    let nextEdge = edgeQueue.dequeue();
    let nodes = nextEdge.data;
    let weight = nextEdge.priority;

    if (!uf.connected(nodes[0], nodes[1])) {
      MST.addEdge(nodes[0], nodes[1], weight);
      uf.union(nodes[0], nodes[1]);
    }
  }
  return MST;
}
