// Time Limit Exceeded
var findClosestPair = function (arr1, arr2, x) {
  let minDiff = Infinity;
  let pair;

  for (let i = 0; i < arr1.length; i += 1) {
    for (let j = 0; j < arr2.length; j += 1) {
      const diff = Math.abs(arr1[i] + arr2[j] - x);
      if (diff < minDiff) {
        minDiff = diff;
        pair = [i, j];
      }
    }
  }

  return pair;
};

var findClosestPair = function (arr1, arr2, x) {
  const n = arr1.length;
  const m = arr2.length;

  const sorted2 = arr2.map((val, idx) => [val, idx]).sort((a, b) => a[0] - b[0]);

  const arr2BinarySearch = (target) => {
    let lo = 0;
    let hi = m - 1;

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (sorted2[mid][0] < target) lo = mid + 1;
      else hi = mid;
    }

    return lo;
  };

  let minDiff = Infinity;
  let pair = [];

  for (let i = 0; i < n; i += 1) {
    const target = x - arr1[i];
    const lo = arr2BinarySearch(target);

    for (let j = Math.max(0, lo - 1); j <= Math.min(m - 1, lo + 1); j++) {
      const diff = Math.abs(arr1[i] + sorted2[j][0] - x);

      if (diff < minDiff) {
        minDiff = diff;
        pair = [i, sorted2[j][1]];
      }
    }
  }

  return pair;
};
