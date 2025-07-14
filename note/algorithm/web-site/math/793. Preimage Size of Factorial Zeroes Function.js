/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function (k) {
  const leftBound = (target) => {
    let left = 0;
    let right = Number.MAX_SAFE_INTEGER;

    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (trailingZeroes(mid) < target) {
        left = mid + 1;
      } else if (trailingZeroes(mid) > target) {
        right = mid;
      } else {
        right = mid;
      }
    }

    return left;
  };

  const rightBound = (target) => {
    let left = 0;
    let right = Number.MAX_SAFE_INTEGER;

    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (trailingZeroes(mid) < target) {
        left = mid + 1;
      } else if (trailingZeroes(mid) > target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left - 1;
  };

  return rightBound(k) - leftBound(k) + 1;
};

// Time Limit Exceeded
/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function (k) {
  let res = 0;
  let n = 0;

  while (true) {
    const zeros = trailingZeroes(n);
    n += 1;

    if (zeros < k) continue;
    if (zeros > k) break;

    res += 1;
  }

  return res;
};

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let res = 0;

  let divisor = 5;

  while (divisor <= n) {
    res += Math.floor(n / divisor);
    divisor *= 5;
  }

  return res;
};
