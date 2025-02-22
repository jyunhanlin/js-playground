/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const nextGreaterElementForNums2 = [];

  const stack = [];
  for (let i = nums2.length - 1; i >= 0; i -= 1) {
    while (stack.length) {
      if (stack[stack.length - 1] > nums2[i]) break;
      stack.pop();
    }

    nextGreaterElementForNums2[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(nums2[i]);
  }

  const nums2Obj = nums2.reduce(
    (acc, cur, index) => ({
      ...acc,
      [cur]: index,
    }),
    {}
  );

  return nums1.map((num) => nextGreaterElementForNums2[nums2Obj[num]]);
};
