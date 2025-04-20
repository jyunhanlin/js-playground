/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  const indegree = new Array(n).fill(0);
  for (let i = 0; i < n; i += 1) {
    if (leftChild[i] != -1) indegree[leftChild[i]] += 1;
    if (rightChild[i] != -1) indegree[rightChild[i]] += 1;
  }

  let root = -1;
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) {
      if (root !== -1) return false;
      root = i;
    } else if (indegree[i] !== 1) return false;
  }

  if (root === -1) return false;

  let uf = new UF(n);
  for (let i = 0; i < n; i++) {
    let left = leftChild[i];
    let right = rightChild[i];

    if (left != -1) {
      if (uf.connected(i, left)) return false;
      uf.union(i, left);
    }
    if (right != -1) {
      if (uf.connected(i, right)) return false;
      uf.union(i, right);
    }
  }
  return uf.count == 1;
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
