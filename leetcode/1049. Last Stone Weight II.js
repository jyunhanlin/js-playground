/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  let result = Infinity;
  const helper = (remainStones) => {
    if (remainStones.length <= 1) {
      const last = remainStones[0] || 0;
      result = Math.min(result, last);
    } else {
      for (let i = 0; i < remainStones.length - 1; i += 1) {
        for (let j = i + 1; j < remainStones.length; j += 1) {
          const newStones = [...remainStones];
          if (j > i) {
            if (newStones[i] === newStones[j]) {
              newStones.splice(j, 1);
              newStones.splice(i, 1);
              helper(newStones);
            } else if (newStones[i] < newStones[j]) {
              newStones.splice(i, 1, newStones[j] - newStones[i]);
              newStones.splice(j, 1);
              helper(newStones);
            } else if (newStones[i] > newStones[j]) {
              newStones.splice(j, 1, newStones[i] - newStones[j]);
              newStones.splice(i, 1);
              helper(newStones);
            }
          }
        }
      }
    }
  };

  helper(stones);

  return result;
};

var lastStoneWeightII = function (stones) {
  const dp = new Map();

  const helper = (nums, x) => {
    if (nums.length <= 0) return x;
    const key = `${nums.length}-${x}`;

    if (!dp.has(key)) {
      dp.set(
        key,
        Math.min(
          Math.abs(helper(nums.slice(1), x + nums[0])),
          Math.abs(helper(nums.slice(1), x - nums[0]))
        )
      );
    }

    return dp.get(key);
  };

  return helper(stones, 0);
};
