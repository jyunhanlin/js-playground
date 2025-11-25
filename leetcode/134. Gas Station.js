/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;

  let sum = 0;
  let minSum = 0;
  let start = 0;

  for (let i = 0; i < n; i += 1) {
    sum += gas[i] - cost[i];

    if (sum < minSum) {
      start = i + 1;
      minSum = sum;
    }
  }

  if (sum < 0) return -1;

  return start === n ? 0 : start;
};

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let sum = 0;

  for (let i = 0; i < n; i += 1) {
    sum += gas[i] - cost[i];
  }

  if (sum < 0) return -1;

  let tank = 0;
  let start = 0;

  for (let i = 0; i < n; i += 1) {
    tank += gas[i] - cost[i];
    if (tank < 0) {
      tank = 0;
      start = i + 1;
    }
  }

  return start === n ? 0 : start;
};
