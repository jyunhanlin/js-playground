var maxRainWater = function (heights) {
  const n = heights.length;

  let max1 = 0;
  let max2 = 0;

  for (let i = 0; i < n; i += 1) {
    if (heights[i] > max1) {
      max2 = max1;
      max1 = heights[i];
    } else if (heights[i] > max2) {
      max2 = heights[i];
    }
  }

  return Math.min(max1, max2) * (n - 1);
};
