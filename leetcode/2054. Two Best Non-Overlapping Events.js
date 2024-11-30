/**
 * @param {number[][]} events
 * @return {number}
 */
var maxTwoEvents = function (events) {
  const endEvents = [...events];
  endEvents.sort((a, b) => a[1] - b[1]);
  events.sort((a, b) => a[0] - b[0]);

  let previousValue = 0;
  let currentEnd = 0;
  let result = 0;

  for (let i = 0; i < events.length; i++) {
    const [start, end, value] = events[i];

    while (endEvents[currentEnd][1] < start) {
      previousValue = Math.max(endEvents[currentEnd][2], previousValue);
      currentEnd++;
    }
    result = Math.max(previousValue + value, result);
  }
  return result;
};
