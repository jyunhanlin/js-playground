/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
  const MOD = 1e9 + 7;
  const dpOdd = new Array(arr.length + 1);
  const dpEven = new Array(arr.length + 1);
  dpOdd[0] = 0;
  dpEven[0] = 0;

  let nums = 0;
  for (let i = 1; i <= arr.length; i += 1) {
    if (arr[i - 1] % 2) {
      dpOdd[i] = dpEven[i - 1] + 1;
      dpEven[i] = dpOdd[i - 1];
    } else {
      dpOdd[i] = dpOdd[i - 1];
      dpEven[i] = dpEven[i - 1] + 1;
    }

    nums = nums + dpOdd[i];
  }

  return nums % MOD;
};

// Time Limit Exceeded
/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
  const MOD = 1e9 + 7;
  const dp = {};

  let nums = 0;
  const helper = (index, sum) => {
    if (index >= arr.length) return;

    if (sum % 2 === 1) {
      nums = (nums + 1) % MOD;
    }

    helper(index + 1, sum + arr[index + 1]);
  };

  for (let i = 0; i < arr.length; i += 1) {
    helper(i, arr[i]);
  }

  return nums;
};
