var minMaxStep = function (stones) {
  let steps = stones.map((stone, index) => (stone === 1 ? index + 1 : undefined)).filter(Boolean);

  steps = [0, ...steps, stones.length + 1];

  let step = -Infinity;

  for (let i = 1; i < steps.length; i += 1) {
    step = Math.max(step, steps[i] - steps[i - 1]);
  }

  return step;
};

var minMaxStep = function (stones) {
  const n = stones.length;
  let prev = 0;
  let maxGap = 0;
  for (let i = 0; i < n; i++) {
    if (stones[i] === 1) {
      const cur = i + 1;
      maxGap = Math.max(maxGap, cur - prev);
      prev = cur;
    }
  }
  maxGap = Math.max(maxGap, n + 1 - prev);
  return maxGap;
};
