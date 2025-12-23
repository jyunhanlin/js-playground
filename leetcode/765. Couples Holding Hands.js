/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
  const n = row.length;
  const uf = new UF(n);

  for (let i = 0; i < n; i += 2) {
    uf.union(Math.floor(row[i] / 2), Math.floor(row[i + 1] / 2));
  }

  return n - uf.count;
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
    // while(this.parent[x] !== x) {
    //   x = this.parent[x];
    // }
    // return x;

    // optimize -> compress the height of the union tree
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);

    return this.parent[x];
  }
}
