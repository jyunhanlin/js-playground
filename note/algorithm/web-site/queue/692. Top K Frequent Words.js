/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  const wordToFreq = new Map();

  for (const word of words) {
    wordToFreq.set(word, (wordToFreq.get(word) || 0) + 1);
  }

  const pq = new PriorityQueue((a, b) => {
    if (a[1] === b[1]) return b[0].localeCompare(a[0]);

    return a[1] - b[1];
  });

  for (const [val, freq] of wordToFreq.entries()) {
    pq.enqueue([val, freq]);
    if (pq.size() > k) pq.dequeue();
  }

  const result = [];
  while (pq.size()) {
    const [val] = pq.dequeue();

    result.push(val);
  }

  return result.reverse();
};
