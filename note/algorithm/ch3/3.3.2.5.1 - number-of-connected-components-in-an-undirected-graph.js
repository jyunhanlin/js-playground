/**
 *
 * @param {number} n
 * @param {number[][]} edges
 */
function countComponents(n, edges) {
  const uf = new UF(n);

  for (const edge of edges) {
    uf.union(edge[0], edge[1]);
  }

  return uf.count;
}

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
