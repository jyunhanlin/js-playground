/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function (rectangles) {
  let X1 = Infinity;
  let Y1 = Infinity;
  let X2 = -Infinity;
  let Y2 = -Infinity;

  const points = new Set();
  let totalArea = 0;
  for (const [x1, y1, x2, y2] of rectangles) {
    X1 = Math.min(X1, x1);
    Y1 = Math.min(Y1, y1);
    X2 = Math.max(X2, x2);
    Y2 = Math.max(Y2, y2);

    totalArea += (x2 - x1) * (y2 - y1);

    const p1 = `${x1}-${y1}`;
    const p2 = `${x1}-${y2}`;
    const p3 = `${x2}-${y1}`;
    const p4 = `${x2}-${y2}`;

    for (const p of [p1, p2, p3, p4]) {
      if (points.has(p)) points.delete(p);
      else points.add(p);
    }
  }

  const expectedArea = (X2 - X1) * (Y2 - Y1);
  if (totalArea !== expectedArea) return false;

  if (points.size !== 4) return false;

  if (!points.has(`${X1}-${Y1}`)) return false;
  if (!points.has(`${X1}-${Y2}`)) return false;
  if (!points.has(`${X2}-${Y1}`)) return false;
  if (!points.has(`${X2}-${Y2}`)) return false;

  return true;
};
