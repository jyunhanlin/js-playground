var isSorted = function (nums, n) {
  for (let i = 1; i < n; i += 1) {
    if (nums[i] < nums[i - 1]) return false;
  }
  return true;
};
var minimumPairRemoval = function (nums) {
  let ans = 0,
    n = nums.length;
  while (!isSorted(nums, n)) {
    ans += 1;
    let min = Infinity;
    let pos = -1;
    for (let i = 1; i < n; i += 1) {
      let sum = nums[i - 1] + nums[i];
      if (sum < min) {
        min = sum;
        pos = i;
      }
    }
    nums[pos - 1] = min;
    nums.splice(pos, 1);
    // for(let i = pos; i < n - 1; i += 1) nums[i] = nums[i + 1];
    n -= 1;
  }
  return ans;
};
