var maxAddedEdges = function (n, edges) {
  const degrees = new Array(n + 1).fill(0);

  for (const [u, v] of edges) {
    degrees[u] += 1;
    degrees[v] += 1;
  }

  let count = 0;
  for (const degree of degrees) {
    if (degree > 1) {
      count += (degree * (degree - 1)) / 2;
    }
  }

  return count;
};

// time complexity: O(n + m) n is the number of nodes, m is the number of edges
// space complexity: O(n)
