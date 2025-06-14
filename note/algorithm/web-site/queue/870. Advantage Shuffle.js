/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  const n = nums1.length;
  const pq = new MaxPriorityQueue((a) => a[1]);

  for (let i = 0; i < n; i += 1) {
    pq.enqueue([i, nums2[i]]);
  }

  nums1.sort((a, b) => a - b);

  let left = 0;
  let right = n - 1;
  const res = [];

  while (pq.size()) {
    const [index, value] = pq.dequeue();

    if (value < nums1[right]) {
      res[index] = nums1[right];
      right -= 1;
    } else {
      res[index] = nums1[left];
      left += 1;
    }
  }

  return res;
};
