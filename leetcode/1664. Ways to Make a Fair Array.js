/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToMakeFair = function (nums) {
  let res = 0;

  let passOdd = 0;
  let passEven = 0;

  for (let i = 0; i < nums.length; i += 1) {
    let oddSum = passOdd;
    let evenSum = passEven;

    if (i % 2 === 0) passEven += nums[i];
    else passOdd += nums[i];

    for (let j = i; j < nums.length; j += 1) {
      if (j === i) continue;

      if (j % 2 !== 0) evenSum += nums[j];
      else oddSum += nums[j];
    }

    if (evenSum === oddSum) res += 1;
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToMakeFair = function (nums) {
  let res = 0;
  let leftOdd = 0;
  let leftEven = 0;
  let rightOdd = 0;
  let rightEven = 0;

  for (let i = 0; i < nums.length; i += 1) {
    if (i % 2 === 0) rightEven += nums[i];
    else rightOdd += nums[i];
  }

  for (let i = 0; i < nums.length; i += 1) {
    if (i % 2 === 0) rightEven -= nums[i];
    else rightOdd -= nums[i];

    if (rightEven + leftOdd === rightOdd + leftEven) res += 1;

    if (i % 2 === 0) leftEven += nums[i];
    else leftOdd += nums[i];
  }

  return res;
};
