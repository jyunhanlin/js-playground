var FrontMiddleBackQueue = function () {
  this.left = [];
  this.right = [];
};

FrontMiddleBackQueue.prototype.balance = function () {
  if (this.right.length > this.left.length + 1) {
    this.left.push(this.right.shift());
  }
  if (this.left.length > this.right.length) {
    this.right.unshift(this.left.pop());
  }
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {
  this.left.unshift(val);
  this.balance();
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
  if (this.size() % 2 === 0) {
    this.right.unshift(val);
  } else {
    this.left.push(val);
  }
  this.balance();
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
  this.right.push(val);
  this.balance();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
  if (this.size() === 0) {
    return -1;
  }
  if (this.size() === 1) {
    return this.right.shift();
  }
  const val = this.left.shift();
  this.balance();
  return val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
  if (this.size() === 0) {
    return -1;
  }
  let val;
  if (this.size() % 2 === 0) {
    val = this.left.pop();
  } else {
    val = this.right.shift();
  }
  this.balance();
  return val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
  if (this.size() === 0) {
    return -1;
  }
  const val = this.right.pop();
  this.balance();
  return val;
};

FrontMiddleBackQueue.prototype.size = function () {
  return this.left.length + this.right.length;
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */
