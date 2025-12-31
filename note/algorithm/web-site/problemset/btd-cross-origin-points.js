var crossOriginCount = function (points) {
  const slopes = points.reduce((res, point, i) => {
    const slope = (point - 0) / (i + 1 - 0);
    if (!res[slope]) res[slope] = 0;
    res[slope] += 1;
    return res;
  }, {});

  let count = 0;
  for (const key in slopes) {
    if (slopes[key] > 1) {
      const n = slopes[key];

      count += (n * (n - 1)) / 2;
    }
  }

  return count;
};

// time complexity: O(n)
// space complexity: O(n)

// Time Limit Exceeded
var crossOriginCount = function (points) {
  const n = points.length;

  let count = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      let slope0 = (points[i] - 0) / (i + 1 - 0);
      let slope = (points[j] - points[i]) / (j - i);

      if (slope0 === slope) count += 1;
    }
  }

  return count;
};
