/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const queue = new MinPriorityQueue((a) => a[0] + a[1]);

  for (let i = 0; i < nums1.length; i += 1) {
    queue.enqueue([nums1[i], nums2[0], 0]);
  }

  const res = [];

  while (queue.size() && k > 0) {
    const [a, b, i] = queue.dequeue();

    res.push([a, b]);
    k -= 1;

    if (i + 1 < nums2.length) {
      queue.enqueue([a, nums2[i + 1], i + 1]);
    }
  }

  return res;
};
