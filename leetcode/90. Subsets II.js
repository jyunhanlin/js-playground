/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const set = new Set();
  const tempResult = [[]];
  const finalResult = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 1) {
    const arr = [nums[i]];
    let len = tempResult.length;
    for (let j = 0; j < len; j += 1) {
      tempResult.push(tempResult[j].concat(arr));
    }
  }

  for (let i = 0; i < tempResult.length; i += 1) {
    set.add(JSON.stringify(tempResult[i]));
  }

  for (const s of set) {
    console.log(s);
    finalResult.push(JSON.parse(s));
  }

  return finalResult;
};

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

console.log(subsetsWithDup([1, 2, 2]));

// Input: nums = [0]
// Output: [[],[0]]
