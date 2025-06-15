var MyCalendar = function () {
  this.calendar = new Map();
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  for (let [start, end] of this.calendar) {
    if (startTime < end && (endTime > start || startTime >= start)) return false;
  }

  this.calendar.set(startTime, endTime);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */

var MyCalendar = function () {
  this.calendar = new SegmentTree(0, 1000000000, 0, 'max');
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  if (this.calendar.query(startTime, endTime - 1) > 0) {
    return false;
  }
  this.calendar.rangeAdd(startTime, endTime - 1, 1);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
