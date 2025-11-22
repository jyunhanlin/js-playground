/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
  // sort by end point, if end point is the same, sort by start point in descending order
  // because we want to cover the most intervals with the least points
  intervals.sort((a, b) => (a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]));

  let result = 0;
  let first = -1;
  let second = -1;

  for (let [start, end] of intervals) {
    let firstIn = first >= start;
    let secondIn = second >= start;

    if (firstIn && secondIn) continue;

    if (!firstIn && !secondIn) {
      result += 2;
      first = end - 1;
      second = end;
    } else {
      result += 1;
      first = second;
      second = end;
    }
  }

  return result;
};

// intervals = [[1,3], [1,4], [2,5], [3,5]]

// 1. 先依結束位置排序：
// 排序後：
// [1,3]
// [1,4]
// [2,5]
// [3,5]

// 2. 開始依序選點
// 1  2 3 4 5
// └──┘           // [1,3]
// └────┘         // [1,4]
//    └──────┘    // [2,5]
//       └───┘    // [3,5]

// [1,3] 未覆蓋 → 選 2,3
// 1  2^ 3^ 4  5
//    ^  ^

// [1,4] 已覆蓋（2,3）

// [2,5] 已覆蓋（2,3）

// [3,5] 只有 3 → 還缺一個 → 選 4（加入覆蓋點）
// 1  2^ 3^ 4^ 5
//          ^

// 最後得到三個點：2, 3, 4
// 每區間都至少覆蓋兩個
