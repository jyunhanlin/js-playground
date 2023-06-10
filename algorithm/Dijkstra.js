// found the shortest path between two nodes in a weighted graph with positive edge weights
// common variant: fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph

let vertices = [];
let adjacencyList = null;

function dijkstra(startNode) {
  const distances = {};
  const paths = {};
  const visited = new Set();

  // TODO: build the adjacencyList from vertices

  // Build the initial dp object from vertices
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i] === startNode) {
      distances[startNode] = 0;
    } else {
      distances[vertices[i]] = Infinity;
    }
    paths[vertices[i]] = null;
  }

  let currVertex = vertexWithMinDistance(distances, visited); // can use priority queue

  while (currVertex !== null) {
    const distance = distances[currVertex];
    const neighbors = adjacencyList[currVertex];

    for (let neighbor in neighbors) {
      let newDistance = distance + neighbors[neighbor];
      if (distances[neighbor] > newDistance) {
        distances[neighbor] = newDistance;
        paths[neighbor] = currVertex;
      }
    }
    visited.add(currVertex);
    currVertex = vertexWithMinDistance(distances, visited);
  }

  console.log(paths);
  console.log(distances);
}
