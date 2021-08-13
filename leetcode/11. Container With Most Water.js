/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let pStart = 0;
  let pEnd = height.length - 1;
  let maxArea = 0;

  while (pStart < pEnd) {
    const mheight = Math.min(height[pStart], height[pEnd]);

    const width = pEnd - pStart;

    maxArea = Math.max(maxArea, width * mheight);

    if (height[pStart] > height[pEnd]) {
      pEnd--;
    } else {
      pStart++;
    }
  }

  return maxArea;
};
