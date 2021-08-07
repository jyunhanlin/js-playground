/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

const sumArr = (arr) => {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
};

var combinationSum = function (candidates, target) {
  const result = [];
  let tempCandArr = candidates.sort((a, b) => a - b).map((c) => [c]);

  while (tempCandArr.length) {
    let nextTempArr = [];

    for (let i = 0; i < tempCandArr.length; i += 1) {
      const currentCandArr = tempCandArr[i];

      const currentSum = sumArr(currentCandArr);

      if (currentSum === target) {
        result.push(tempCandArr[i]);
      } else if (currentSum < target) {
        for (let j = 0; j < candidates.length; j += 1) {
          if (currentCandArr[currentCandArr.length - 1] > candidates[j]) continue;
          if (currentSum + candidates[j] > target) break;
          nextTempArr.push([...currentCandArr, candidates[j]]);
        }
      }
    }
    tempCandArr = nextTempArr;
  }

  return result;
};

console.log(combinationSum([2, 3, 6, 7], 7));
