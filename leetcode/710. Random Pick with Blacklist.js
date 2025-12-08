/**
 * @param {number} n
 * @param {number[]} blacklist
 */
var Solution = function (n, blacklist) {
  this.size = n - blacklist.length;
  this.mapping = {};

  const blackSet = new Set(blacklist);

  let last = n - 1;

  for (const b of blacklist) {
    if (b >= this.size) continue;

    while (blackSet.has(last)) {
      last -= 1;
    }

    this.mapping[b] = last;
    last -= 1;
  }
};

/**
 * @return {number}
 */
Solution.prototype.pick = function () {
  const index = Math.floor(Math.random() * this.size);

  return this.mapping[index] || index;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
