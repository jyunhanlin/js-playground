/**
 * @param {string} s
 * @return {number}
 */
var secondsToRemoveOccurrences = function (s) {
  let rs = s;
  let result = 0;

  while (true) {
    if (rs.includes('01')) {
      rs = rs.replace(/01/g, '10');
      result += 1;
    } else break;
  }

  return result;
};
