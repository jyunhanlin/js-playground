/**
 * @param {number[]} arr
 * @return {number}
 */
const findLargestNumber = (arr) => {
  return Math.max(...arr);
};

const countTrap = (height, startIndex, endIndex) => {
  const startHeight = height[startIndex];
  const endHeight = height[endIndex];
  const basisHeight = Math.min(startHeight, endHeight);

  let result = 0;
  for (let i = startIndex + 1; i < endIndex; i += 1) {
    result += basisHeight - height[i];
  }
  return result;
};

const findTrap = (height, startIndex, endIndex, maxNumIndex) => {
  // find index that height[index] - 1 && startIndex + 1 !==  endIndex;
  // countTrap
  //

  const maxNum = height[maxNumIndex];

  return 0;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let result = 0;

  const startIndex = 0;
  const endIndex = height.length - 1;

  const maxNum = findLargestNumber(height);
  const maxNumIndex = height.indexOf(maxNum);

  result += findTrap(height, startIndex, endIndex, maxNumIndex);

  return result;
};

// [0,1,0,2,1,0,1,3,2,1,2,1] => 6
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

// [4,2,0,3,2,5] => 9
// console.log(trap([4, 2, 0, 3, 2, 5]));
