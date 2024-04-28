/**
 * @param {string} hamsters
 * @return {number}
 */
var minimumBuckets = function (hamsters) {
  const hamstersArray = hamsters.split('');

  let buckets = 0;
  for (let i = 0; i < hamstersArray.length; i += 1) {
    if (hamstersArray[i] === 'H') {
      if (hamstersArray[i - 1] === 'B') continue;
      if (hamstersArray[i + 1] === '.') {
        hamstersArray[i + 1] = 'B';
        buckets += 1;
        continue;
      }
      if (hamstersArray[i - 1] === '.') {
        hamstersArray[i - 1] = 'B';
        buckets += 1;
        continue;
      } else return -1;
    }
  }

  return buckets;
};
