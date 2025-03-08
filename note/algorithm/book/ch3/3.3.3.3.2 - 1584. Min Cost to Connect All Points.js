/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const n = points.length;

  const edges = [];

  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const xi = points[i][0],
        yi = points[i][1];
      const xj = points[j][0],
        yj = points[j][1];

      edges.push([i, j, Math.abs(xi - xj) + Math.abs(yi - yj)]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  let mst = 0;

  const uf = new UF(n);

  for (const [u, v, weight] of edges) {
    if (uf.connected(u, v)) continue;

    mst += weight;
    uf.union(u, v);
  }

  return mst;
};

class UF {
  count = 0;
  parent = [];
  constructor(n) {
    this.count = n;

    for (let i = 0; i < n; i += 1) {
      this.parent[i] = i;
    }
  }

  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP === rootQ) return;

    this.parent[rootP] = rootQ;
    this.count -= 1;
  }

  connected(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    return rootP === rootQ;
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);

    return this.parent[x];
  }
}
