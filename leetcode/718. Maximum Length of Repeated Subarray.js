/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  const nums1Obj = {};
  const nums2Obj = {};

  for (let i = 0; i < nums1.length; i += 1) {
    if (!nums1Obj[nums1[i]]) nums1Obj[nums1[i]] = [];
    nums1Obj[nums1[i]].push(i);
  }

  for (let i = 0; i < nums2.length; i += 1) {
    if (!nums2Obj[nums2[i]]) nums2Obj[nums2[i]] = [];
    nums2Obj[nums2[i]].push(i);
  }

  let res = 0;
  for (let i = 0; i < nums1.length; i += 1) {
    const pivot = nums1[i];
    if (nums2Obj[pivot]) {
      for (let j = 0; j < nums2Obj[pivot].length; j += 1) {
        let idx1 = i + 1;
        let idx2 = nums2Obj[pivot][j] + 1;

        while (nums1[idx1] === nums2[idx2] && idx1 < nums1.length) {
          idx1 += 1;
          idx2 += 1;
        }

        res = Math.max(res, idx1 - i);
      }
    }
  }

  return res;
};

var findLength = function (nums1, nums2) {
  const dp = new Array(nums1.length + 1).fill(0).map(() => new Array(nums2.length + 1).fill(0)); // 1- Initialize 2D Array

  let maxLength = 0; // 2- Set Max Length to Zero
  for (let i = 1; i <= nums1.length; i++)
    for (let j = 1; j <= nums2.length; j++)
      if (nums1[i - 1] == nums2[j - 1]) {
        // 3- Compare if both Equals
        dp[i][j] = 1 + dp[i - 1][j - 1]; // 4- Added Plus Previous One
        maxLength = Math.max(maxLength, dp[i][j]); // 5- Find Max Between maxLength and Current Value
      }

  return maxLength;
};
