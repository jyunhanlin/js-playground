var maximumSum = function (n, arr) {
  let absSum = 0;
  let negCount = 0;
  let minAbs = Infinity;

  for (const num of arr) {
    const absNum = Math.abs(num);
    absSum += absNum;
    minAbs = Math.min(minAbs, absNum);

    if (num < 0) negCount += 1;
  }

  if (n % 2 === 1 || negCount % 2 === 0) return absSum;

  return absSum - 2 * minAbs;
};

// time complexity: O(n)
// space complexity: O(1)
