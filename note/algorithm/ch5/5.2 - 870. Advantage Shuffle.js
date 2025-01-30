/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  const n = nums1.length;
  const clonedNums2 = nums2.map((num, i) => [num, i]); // can use priority queue to optimize
  const res = [];
  const loseNums = [];

  nums1.sort((a, b) => a - b);
  clonedNums2.sort((a, b) => a[0] - b[0]);

  let clonedNums2Index = 0;

  for (let i = 0; i < n; i += 1) {
    const [num2, nums2index] = clonedNums2[clonedNums2Index];

    if (nums1[i] > num2) {
      res[nums2index] = nums1[i];
      clonedNums2Index += 1;
    } else {
      loseNums.push(nums1[i]);
    }
  }

  for (let i = 0; i < n; i += 1) {
    if (res[i] === undefined) res[i] = loseNums.pop();
  }

  return res;
};
