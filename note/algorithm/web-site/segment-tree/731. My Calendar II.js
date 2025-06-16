var MyCalendarTwo = function () {
  this.calendar = new SegmentTree(0, 1e9, 0, 'max');
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (startTime, endTime) {
  if (this.calendar.query(startTime, endTime - 1) >= 2) return false;

  this.calendar.rangeAdd(startTime, endTime - 1, 1);

  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */
