var minimumDeltaOfCandy = function (k, candies) {
  const n = candies.length;
  const sum = candies.reduce((a, b) => a + b);
  candies.sort((a, b) => a - b);

  const leftBound = (target) => {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (candies[mid] < target) left = mid + 1;
      else right = mid;
    }

    return left;
  };

  let min = Infinity;
  for (let i = 0; i < n - 1; i += 1) {
    // |k*x - y| = |k*x - (sum - x)| = |(k+1)*x - sum|
    const target = sum / (k + 1) - candies[i];
    const pos = leftBound(target);

    for (let j = Math.max(0, pos - 1); j <= Math.min(n - 1, pos); j += 1) {
      if (i === j) continue;
      const x = candies[i] + candies[j];
      const diff = Math.abs((k + 1) * x - sum);
      min = Math.min(min, diff);
    }
  }

  return min;
};
