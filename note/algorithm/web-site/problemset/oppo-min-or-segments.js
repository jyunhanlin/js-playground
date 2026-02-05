var minOrSegments = function (nums, k) {
  let count = 0;

  let acc = 0;
  for (const num of nums) {
    if (num > k) return -1;
    acc |= num;

    if (acc > k) {
      count += 1;
      acc = num;
    }
  }

  return count + 1;
};
