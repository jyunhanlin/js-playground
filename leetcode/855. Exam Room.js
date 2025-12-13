/**
 * @param {number} n
 */
var ExamRoom = function (n) {
  this.n = n;
  this.pq = new PriorityQueue(([start1, end1], [start2, end2]) => {
    let max1 = -1;
    let max2 = -1;

    if (start1 === -1) {
      max1 = end1;
    } else if (end1 === this.n) {
      max1 = this.n - 1 - start1;
    }

    if (start2 === -1) {
      max2 = end2;
    } else if (end2 === this.n) {
      max2 = this.n - 1 - start2;
    }

    if (max1 === -1) {
      const seat1 = Math.floor((end1 + start1) / 2);
      max1 = Math.min(Math.abs(start1 - seat1), Math.abs(end1 - seat1));
    }

    if (max2 === -1) {
      const seat2 = Math.floor((end2 + start2) / 2);
      max2 = Math.min(Math.abs(start2 - seat2), Math.abs(end2 - seat2));
    }

    if (max1 !== max2) return max2 - max1;

    return start1 - start2;
  });

  this.pq.enqueue([-1, n]);
};

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function () {
  const [start, end] = this.pq.dequeue();

  if (start === -1) {
    this.pq.enqueue([0, end]);
    return 0;
  }

  if (end === this.n) {
    this.pq.enqueue([start, this.n - 1]);
    return this.n - 1;
  }

  const seat = Math.floor((end - start) / 2) + start;

  this.pq.enqueue([start, seat]);
  this.pq.enqueue([seat, end]);

  return seat;
};

/**
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function (p) {
  let startForP = -1;
  let endForP = this.n;

  const toQueue = [];

  while (this.pq.size()) {
    const [start, end] = this.pq.dequeue();

    if (start === p) {
      endForP = end;
      // if (p ===0) break;
    } else if (end === p) {
      startForP = start;
      // if (p === this.n) break;
    } else {
      toQueue.push([start, end]);
    }
  }

  toQueue.push([startForP, endForP]);

  for (const interval of toQueue) {
    this.pq.enqueue(interval);
  }
};

/**
 * Your ExamRoom object will be instantiated and called as such:
 * var obj = new ExamRoom(n)
 * var param_1 = obj.seat()
 * obj.leave(p)
 */

/**
 * @param {number} n
 */
var ExamRoom = function (n) {
  this.n = n;
  this.startMap = new Map();
  this.endMap = new Map();
  this.intervals = new Set();
  this.intervals.add([-1, n]);
};

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function () {
  let longestInterval;
  let maxDist = -1;

  for (const interval of this.intervals) {
    const dist = this.distance(interval);

    if (dist > maxDist || (dist === maxDist && interval[0] < longestInterval[0])) {
      longestInterval = interval;
      maxDist = dist;
    }
  }

  const [x, y] = longestInterval;
  let seat;

  if (x === -1) seat = 0;
  else if (y === this.n) seat = this.n - 1;
  else seat = Math.floor((y - x) / 2) + x;

  this.removeInterval(longestInterval);
  this.addInterval([x, seat]);
  this.addInterval([seat, y]);

  return seat;
};

/**
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function (p) {
  const startFromPInterval = this.startMap.get(p);
  const endFromPInterval = this.endMap.get(p);

  this.removeInterval(startFromPInterval);
  this.removeInterval(endFromPInterval);
  this.addInterval([endFromPInterval[0], startFromPInterval[1]]);
};

ExamRoom.prototype.addInterval = function (interval) {
  this.intervals.add(interval);
  this.startMap.set(interval[0], interval);
  this.endMap.set(interval[1], interval);
};

ExamRoom.prototype.removeInterval = function (interval) {
  this.intervals.delete(interval);
  this.startMap.delete(interval[0]);
  this.endMap.delete(interval[1]);
};

ExamRoom.prototype.distance = function (interval) {
  const [x, y] = interval;
  if (x === -1) return y;
  if (y === this.n) return this.n - 1 - x;

  // the distance from mid to the x
  return Math.floor((y - x) / 2);
};

/**
 * Your ExamRoom object will be instantiated and called as such:
 * var obj = new ExamRoom(n)
 * var param_1 = obj.seat()
 * obj.leave(p)
 */
