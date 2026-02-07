var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  const result = [];

  for (const num of set1) {
    if (set2.has(num)) result.push(num);
  }

  return result.sort((a, b) => a - b);
};
