var MyCalendarThree = function () {
  this.calendar = new SegmentTree(0, 1e9, 0, 'max');
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
  this.calendar.rangeAdd(startTime, endTime - 1, 1);

  return this.calendar.query(0, 1e9);
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */
