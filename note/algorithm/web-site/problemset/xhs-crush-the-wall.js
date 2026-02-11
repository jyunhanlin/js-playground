var calculateProbability = function (n) {
  const probability = 2.0 / (n * (n - 1));
  return probability.toFixed(10);
};
