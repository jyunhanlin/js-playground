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
    const row = rowMap.get(x);
    const col = colMap.get(y);

    const posRow = lowerBound(row, y);
    const left = posRow > 0;
    const right = posRow + 1 < row.length;

    const posCol = lowerBound(col, x);
    const up = posCol > 0;
    const down = posCol + 1 < col.length;

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
