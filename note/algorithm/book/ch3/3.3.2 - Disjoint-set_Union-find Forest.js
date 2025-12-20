class UF {
  count = 0;
  parent = [];

  // time complexity: O(n)
  // space complexity: O(n)
  constructor(n) {
    this.count = n;

    for (let i = 0; i < n; i += 1) {
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
