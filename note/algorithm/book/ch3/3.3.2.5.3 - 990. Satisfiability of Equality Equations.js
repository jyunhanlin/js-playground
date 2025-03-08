/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  const uf = new UF(26);

  for (const equation of equations) {
    if (equation[1] === '=') {
      uf.union(equation.charCodeAt(0) - 97, equation.charCodeAt(3) - 97);
    }
  }

  for (const equation of equations) {
    if (equation[1] === '!') {
      if (uf.connected(equation.charCodeAt(0) - 97, equation.charCodeAt(3) - 97)) return false;
    }
  }

  return true;
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
