var MedianFinder = function () {
  this.maxPq = new MaxPriorityQueue();
  this.minPq = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.minPq.size() >= this.maxPq.size()) {
    this.minPq.enqueue(num);
    this.maxPq.enqueue(this.minPq.dequeue());
  } else {
    this.maxPq.enqueue(num);
    this.minPq.enqueue(this.maxPq.dequeue());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.maxPq.size() < this.minPq.size()) {
    return this.minPq.front();
  } else if (this.maxPq.size() > this.minPq.size()) {
    return this.maxPq.front();
  }

  return (this.maxPq.front() + this.minPq.front()) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
