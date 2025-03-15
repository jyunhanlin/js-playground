var ProductOfNumbers = function () {
  this.preProduct = [1];
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
  if (num === 0) {
    this.preProduct = [1];
    return;
  }

  const n = this.preProduct.length;

  this.preProduct.push(this.preProduct[n - 1] * num);
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  const n = this.preProduct.length;
  if (k > n - 1) {
    return 0;
  }

  return this.preProduct[n - 1] / this.preProduct[n - k - 1];
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */
