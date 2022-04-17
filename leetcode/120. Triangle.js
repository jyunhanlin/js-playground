/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  if (triangle.length === 1) return triangle[0][0];

  let tmpResult = triangle[0][0];
  const mem = { '00': triangle[0][0] };
  let result = null;

  for (let i = 1; i < triangle.length; i += 1) {
    for (let j = 0; j < triangle[i].length; j += 1) {
      if (j === 0) {
        tmpResult = mem[`${i - 1}${j}`] + triangle[i][j];
      } else if (j === triangle[i].length - 1) {
        tmpResult = mem[`${i - 1}${j - 1}`] + triangle[i][j];
      } else {
        tmpResult = Math.min(
          mem[`${i - 1}${j}`] + triangle[i][j],
          mem[`${i - 1}${j - 1}`] + triangle[i][j]
        );
      }

      mem[`${i}${j}`] = tmpResult;

      if (i === triangle.length - 1) {
        if (result === null) result = tmpResult;
        else result = Math.min(result, tmpResult);
      }
    }
  }

  return result;
};
