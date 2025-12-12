/**
 * @param {number} n
 * @param {number[][]} buildings
 * @return {number}
 */
var countCoveredBuildings = function (n, buildings) {
  const rowMap = new Map();
  const colMap = new Map();

  for (const [x, y] of buildings) {
    if (!rowMap.has(x)) rowMap.set(x, []);
    if (!colMap.has(y)) colMap.set(y, []);

    rowMap.get(x).push(y);
    colMap.get(y).push(x);
  }

  for (let [key, val] of rowMap)
    rowMap.set(
      key,
      val.sort((a, b) => a - b)
    );
  for (let [key, val] of colMap)
    colMap.set(
      key,
      val.sort((a, b) => a - b)
    );

  let count = 0;

  for (const [x, y] of buildings) {
    const rowList = rowMap.get(x);
    const colList = colMap.get(y);

    const posRow = lowerBound(rowList, y);
    const left = posRow > 0;
    const right = posRow + 1 < rowList.length;

    const posCol = lowerBound(colList, x);
    const up = posCol > 0;
    const down = posCol + 1 < colList.length;

    if (left && right && up && down) count++;
  }

  return count;
};

function lowerBound(arr, target) {
  let left = 0,
    right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}

// time complexity: O(n log n)
// space complexity: O(n)

// Time Limit Exceeded
var countCoveredBuildings = function (n, buildings) {
  const rowMap = new Map();
  const colMap = new Map();

  for (const [x, y] of buildings) {
    if (!rowMap.has(x)) rowMap.set(x, []);
    if (!colMap.has(y)) colMap.set(y, []);

    rowMap.get(x).push(y);
    colMap.get(y).push(x);
  }

  let count = 0;

  for (const [x, y] of buildings) {
    const rowList = rowMap.get(x);
    const colList = colMap.get(y);

    let left = false;
    let right = false;
    let up = false;
    let down = false;

    for (let col of rowList) {
      if (col < y) left = true;
      if (col > y) right = true;
    }

    for (let row of colList) {
      if (row < x) up = true;
      if (row > x) down = true;
    }

    if (left && right && up && down) count++;
  }

  return count;
};

// time complexity: O(n^2)
// space complexity: O(n)
