/**
 * @param {number} x
 * @param {number} y
 * @param {number} target
 * @return {boolean}
 */
var canMeasureWater = function (x, y, target) {
  const queue = [];
  const visited = new Set();

  queue.push([0, 0]);
  visited.add(`0-0`);

  while (queue.length) {
    const cur = queue.shift();

    if (cur[0] === target || cur[1] === target || cur[0] + cur[1] === target) return true;

    const allNext = [];

    allNext.push([x, cur[1]]);
    allNext.push([cur[0], y]);
    allNext.push([0, cur[1]]);
    allNext.push([cur[0], 0]);
    allNext.push([cur[0] - Math.min(cur[0], y - cur[1]), cur[1] + Math.min(cur[0], y - cur[1])]);
    allNext.push([cur[0] + Math.min(cur[1], x - cur[0]), cur[1] - Math.min(cur[1], x - cur[0])]);

    for (const next of allNext) {
      const key = `${next[0]}-${next[1]}`;

      if (visited.has(key)) continue;

      queue.push(next);
      visited.add(key);
    }
  }

  return false;
};
