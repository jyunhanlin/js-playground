/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const charS = s.split('');

  const charToFreq = new Map();

  for (const c of charS) {
    charToFreq.set(c, (charToFreq.get(c) || 0) + 1);
  }
  const pq = new MaxPriorityQueue((a) => a[1]);

  for (const [key, value] of charToFreq.entries()) {
    pq.enqueue([key, value]);
  }

  const result = [];

  while (pq.size()) {
    const [key, value] = pq.dequeue();

    result.push(key.repeat(value));
  }

  return result.join('');
};
