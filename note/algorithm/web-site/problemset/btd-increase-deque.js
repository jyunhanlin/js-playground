var canFormMonotoneDeque = function (nums) {
  const stack = [nums[0]];

  for (let i = 1; i < nums.length; i += 1) {
    const num = nums[i];
    if (stack[0] >= num) stack.unshift(num);
    else if (stack[stack.length - 1] <= num) stack.push(num);
    else return 'NO';
  }

  return 'YES';
};
