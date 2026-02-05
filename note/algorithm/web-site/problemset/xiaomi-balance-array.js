var maxArraySum = function (nums) {
  let negCount = 0;
  let absSum = 0;
  let minAbs = Infinity;

  for (const num of nums) {
    if (num < 0) negCount += 1;

    const absNum = Math.abs(num);
    absSum += absNum;
    minAbs = Math.min(minAbs, absNum);
  }

  if (negCount % 2 === 0) return absSum;

  return absSum - 2 * minAbs;
};
