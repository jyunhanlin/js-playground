var MedianFinder = function () {
  this.maxPq = new MaxPriorityQueue();
  this.minPq = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // Strategy: Always maintain maxPq.size() >= minPq.size()
  // This ensures that when total count is odd, median is the top of maxPq

  if (this.minPq.size() >= this.maxPq.size()) {
    // Case 1: minPq size >= maxPq size
    // First add new number to minPq, then move minPq's smallest to maxPq
    // This ensures maxPq always stores the smaller half of numbers
    this.minPq.enqueue(num);
    this.maxPq.enqueue(this.minPq.dequeue());
  } else {
    // Case 2: minPq size < maxPq size
    // First add new number to maxPq, then move maxPq's largest to minPq
    // This maintains balance between the two heaps
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
