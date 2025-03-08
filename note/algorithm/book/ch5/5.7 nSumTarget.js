const nSumTarget = (nums, n, start, target) => {
  if (n < 2 || nums.length < n) return [];

  const res = [];
  if (n === 2) {
    let left = start;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum < target) {
        while (left < right && nums[left] === nums[left + 1]) left += 1;
      } else if (sum > target) {
        while (left < right && nums[right] === nums[right - 1]) right -= 1;
      } else {
        res.push([nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left += 1;
        while (left < right && nums[right] === nums[right - 1]) right -= 1;
      }
    }
  } else {
    for (let i = start; i < nums.length; i += 1) {
      const subRes = nSumTarget(nums, n - 1, i + 1, target - nums[i]);

      for (let j = 0; j < subRes.length; j += 1) {
        res.push([nums[i], ...subRes[j]]);
      }
      while (i < nums.length - 1 && nums[i] === nums[i + 1]) i += 1;
    }
  }

  return res;
};
