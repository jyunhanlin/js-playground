var maximumDegreeDelta = function (n, edges) {
  const kruskal = (sortedEdgeData) => {
    const uf = new UF(n);
    const selectedEdges = [];
    const degrees = Array(n + 1).fill(0);

    for (const [i, _, u, v] of sortedEdgeData) {
      if (uf.connected(u, v)) continue;

      uf.union(u, v);
      selectedEdges.push(i);
      degrees[u] += 1;
      degrees[v] += 1;

      if (selectedEdges.length === n - 1) break;
    }

    return [selectedEdges, degrees];
  };

  const edgeData = edges.map(([u, v], i) => {
    let weight = 0;
    if (u === 1 || v === 1) weight -= 1;
    if (u === n || v === n) weight += 1;

    return [i + 1, weight, u, v];
  });

  const ascEdges = [...edgeData].sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]));
  const [selectedEdges1, degrees1] = kruskal(ascEdges);

  const descEdges = [...edgeData].sort((a, b) => (a[1] !== b[1] ? b[1] - a[1] : a[0] - b[0]));
  const [selectedEdges2, degrees2] = kruskal(descEdges);

  return Math.abs(degrees1[1] - degrees1[n]) >= Math.abs(degrees2[1] - degrees2[n])
    ? selectedEdges1
    : selectedEdges2;
};

class UF {
  count = 0;
  parent = [];

  // time complexity: O(n)
  // space complexity: O(n)
  constructor(n) {
    this.count = n;

    for (let i = 0; i <= n; i += 1) {
      this.parent[i] = i;
    }
  }

  // α(n) is the inverse of the Ackermann function
  // α(n) is a very slow-growing function, so for all practical purposes, we can consider it to be a constant
  // time complexity: O(α(n)) -> amortized time complexity: O(1)
  // space complexity: O(1)
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP === rootQ) return;

    this.parent[rootP] = rootQ;
    this.count -= 1;
  }

  // time complexity: O(α(n)) -> amortized time complexity: O(1)
  // space complexity: O(1)
  connected(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    return rootP === rootQ;
  }

  // time complexity: O(α(n)) -> amortized time complexity: O(1)
  // space complexity: O(1)
  find(x) {
    // while(this.parent[x] !== x) {
    //   x = this.parent[x];
    // }
    // return x;

    // optimize -> compress the height of the union tree
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);

    return this.parent[x];
  }
}
