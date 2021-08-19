/**
 *
 * @param {array} intervals
 * @return {boolean}
 */

const canAttendMeetings = (intervals) => {
  const starts = [];
  const ends = [];

  for (let i = 0; i < intervals.length; i += 1) {
    starts.push(intervals[i][0]);
    ends.push(intervals[i][1]);
  }

  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  for (let i = 1; i < starts.length; i += 1) {
    if (starts[i] < ends[i - 1]) return false;
  }

  return true;
};
