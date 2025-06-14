/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const pq = new MinPriorityQueue();

  for (const num of nums) {
    pq.enqueue(num);

    if (pq.size() > k) pq.dequeue();
  }

  return pq.front();
};
