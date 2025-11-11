/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
var processQueries = function (c, connections, queries) {
  const result = [];
  const ops = new Array(c + 1).fill(1);
  const uf = new UF(c + 1);

  for (const [u, v] of connections) uf.union(u, v);

  const connectors = new Array(c + 1);
  const queuePtr = new Array(c + 1).fill(0); // Track the next unused index for each group, without this one, meet Time Limit Exceeded

  for (let i = 1; i <= c; i++) {
    const r = uf.find(i);
    if (!connectors[r]) connectors[r] = [];
    connectors[r].push(i);
  }

  for (let i = 1; i <= c; i++) {
    if (connectors[i]) connectors[i].sort((a, b) => a - b);
  }

  for (const [op, s] of queries) {
    if (op == 1) {
      if (ops[s]) {
        result.push(s);
      } else {
        const r = uf.find(s);
        const connector = connectors[r];
        let ptr = queuePtr[r];
        // Skip nodes that have already been removed
        while (ptr < connector.length && !ops[connector[ptr]]) ptr++;
        queuePtr[r] = ptr; // Update pointer
        if (ptr < connector.length) {
          result.push(connector[ptr]);
        } else {
          result.push(-1);
        }
      }
    } else {
      ops[s] = 0;
    }
  }
  return result;
};

class UF {
  count = 0;
  parent = [];
  constructor(n) {
    this.count = n;
    for (let i = 0; i < n; i++) this.parent[i] = i;
  }
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if (rootP === rootQ) return;
    this.parent[rootP] = rootQ;
    this.count -= 1;
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
}
