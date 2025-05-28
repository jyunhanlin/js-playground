/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function (m, n) {
  this.m = m;
  this.n = n;
  this.len = m * n;
  this.deletedToExist = new Map();
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function () {
  const rand = Math.floor(Math.random() * this.len);

  let res = rand;
  if (this.deletedToExist.has(rand)) {
    res = this.deletedToExist.get(rand);
  }

  let last = this.len - 1;
  if (this.deletedToExist.has(last)) {
    last = this.deletedToExist.get(last);
  }

  this.deletedToExist.set(rand, last);

  this.len -= 1;

  return [Math.floor(res / this.n), res % this.n];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function () {
  this.len = this.m * this.n;
  this.deletedToExist.clear();
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */
