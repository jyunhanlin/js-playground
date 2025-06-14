/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const valToFreq = new Map();

  for (const num of nums) {
    valToFreq.set(num, (valToFreq.get(num) || 0) + 1);
  }

  const pq = new MinPriorityQueue((a) => a[1]);

  for (const [val, freq] of valToFreq.entries()) {
    pq.enqueue([val, freq]);
    if (pq.size() > k) pq.dequeue();
  }

  const result = [];
  while (pq.size()) {
    const [val] = pq.dequeue();

    result.push(val);
  }

  return result;
};
