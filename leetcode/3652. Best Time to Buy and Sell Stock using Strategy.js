/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
  const n = prices.length;

  const prefix = [0];
  const prefixStrategy = [0];

  for (let i = 0; i < n; i += 1) {
    prefix[i + 1] = prefix[i] + prices[i];
    prefixStrategy[i + 1] = prefixStrategy[i] + prices[i] * strategy[i];
  }

  let i = 0;
  let j = k - 1;

  let max = prefixStrategy[n];

  while (j < n) {
    const left = prefixStrategy[i];
    const mid = prefix[j + 1] - prefix[j + 1 - Math.floor(k / 2)];
    const right = prefixStrategy[n] - prefixStrategy[j + 1];

    max = Math.max(max, left + mid + right);

    i += 1;
    j += 1;
  }

  return max;
};

// time complexity: O(n)
// space complexity: O(n)

// Time Limit Exceeded
/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
  const n = prices.length;

  const sum = prices.map((p, idx) => p * strategy[idx]).reduce((a, b) => a + b);

  let max = sum;

  let i = 0;
  let j = k - 1;

  while (j < n) {
    let acc = sum;

    let count = i;

    while (count < i + k / 2) {
      if (strategy[count] === -1) {
        acc = acc + prices[count];
      }

      if (strategy[count] === 1) {
        acc = acc - prices[count];
      }

      count += 1;
    }

    while (count <= j) {
      if (strategy[count] === 0) {
        acc = acc + prices[count];
      }

      if (strategy[count] === -1) {
        acc = acc + prices[count] * 2;
      }
      count += 1;
    }

    max = Math.max(max, acc);

    i += 1;
    j += 1;
  }

  return max;
};
