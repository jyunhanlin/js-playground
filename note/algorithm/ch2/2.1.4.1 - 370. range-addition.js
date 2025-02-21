function getModifiedArray(length, updates) {
  const diff = new Difference(new Array(length).fill(0));

  for (const [start, end, val] of updates) {
    diff.increment(start, end, val);
  }

  return diff.result();
}

class Difference {
  constructor(nums) {
    const diff = [];
    diff[0] = nums[0];

    for (let i = 1; i < nums.length; i += 1) {
      diff[i] = nums[i] - nums[i - 1];
    }

    this.diff = diff;
  }

  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) this.diff[j + 1] -= val;
  }

  result() {
    const res = [];

    res[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i += 1) {
      res[i] = res[i - 1] + this.diff[i];
    }

    return res;
  }
}
