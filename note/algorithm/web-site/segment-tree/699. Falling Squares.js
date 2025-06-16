/**
 * @param {number[][]} positions
 * @return {number[]}
 */
var fallingSquares = function (positions) {
  // 1e8 + 1e6 is the boundary of the segment tree, from the problem description
  // 1e8 is the max left position, 1e6 is the max right position
  const boundary = 1e8 + 1e6;
  const st = new SegmentTree(0, boundary, 0, 'max');

  const res = [];
  let max = 0;

  for (const [left, sideLength] of positions) {
    const right = left + sideLength - 1;

    const curMax = st.query(left, right);

    const curHeight = curMax + sideLength;

    st.rangeUpdate(left, right, curHeight);

    max = Math.max(max, curHeight);
    res.push(max);
  }

  return res;
};
