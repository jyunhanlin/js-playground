/**
 * @param {number} n
 */
var SeatManager = function (n) {
  this.pq = new MinPriorityQueue();

  for (let i = 1; i <= n; i += 1) {
    this.pq.enqueue(i);
  }
};

/**
 * @return {number}
 */
SeatManager.prototype.reserve = function () {
  return this.pq.dequeue();
};

/**
 * @param {number} seatNumber
 * @return {void}
 */
SeatManager.prototype.unreserve = function (seatNumber) {
  this.pq.enqueue(seatNumber);
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * var obj = new SeatManager(n)
 * var param_1 = obj.reserve()
 * obj.unreserve(seatNumber)
 */
