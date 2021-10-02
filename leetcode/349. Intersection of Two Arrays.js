/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const nums1Len = nums1.length,
    nums2Len = nums2.length;

  if (!nums1Len || !nums2Len) return [];

  let short = nums1,
    long = nums2;

  if (nums1Len > nums2Len) {
    short = nums2;
    long = nums1;
  }

  const result = new Set();

  for (let i = 0; i < short.length; i += 1) {
    const sNum = short[i];

    if (long.includes(sNum)) result.add(sNum);
  }

  return [...result];
};

function intersect(nums1, nums2) {
  let result = [];
  let setNum1 = new Set(nums1);
  let setNum2 = new Set(nums2);

  let [smallSet, largeSet] =
    setNum1.length < setNum2.length ? [setNum1, setNum2] : [setNum2, setNum1];

  smallSet.forEach((num) => {
    largeSet.has(num) && result.push(num);
  });

  return result;
}
//Solution 2: O(n)

function intersect(nums1, nums2) {
  let setNum1 = new Set(nums1);

  return [...new Set(nums2.filter((num) => setNum1.has(num)))];
}
