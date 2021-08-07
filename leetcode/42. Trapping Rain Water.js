/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let total = 0;

  for (let i = 0; i < height.length; i += 1) {
    let leftIdx = i;
    let rightIdx = i;
    let maxLeft = 0;
    let maxRight = 0;

    while (leftIdx >= 0) {
      maxLeft = Math.max(maxLeft, height[leftIdx]);
      leftIdx--;
    }

    while (rightIdx < height.length) {
      maxRight = Math.max(maxRight, height[rightIdx]);
      rightIdx++;
    }

    const current = Math.min(maxLeft, maxRight) - height[i];

    if (current > 0) total += current;
  }

  return total;
};

// optimized
const getTrappedRainwater = function (heights) {
  let left = 0,
    right = heights.length - 1,
    totalWater = 0,
    maxLeft = 0,
    maxRight = 0;

  while (left < right) {
    if (heights[left] <= heights[right]) {
      if (heights[left] >= maxLeft) {
        maxLeft = heights[left];
      } else {
        totalWater += maxLeft - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= maxRight) {
        maxRight = heights[right];
      } else {
        totalWater += maxRight - heights[right];
      }

      right--;
    }
  }

  return totalWater;
};

// [0,1,0,2,1,0,1,3,2,1,2,1] => 6
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

// [4,2,0,3,2,5] => 9
// console.log(trap([4, 2, 0, 3, 2, 5]));
