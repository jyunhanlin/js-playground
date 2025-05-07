/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map();
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const w = values[i];
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push([b, w]);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(b).push([a, 1 / w]);
  }

  const bfs = (start, end) => {
    if (!graph.has(start) || !graph.has(end)) return -1;
    if (start === end) return 1;

    const queue = [start];
    const visited = new Set(queue);

    const weightMap = new Map();
    weightMap.set(start, 1.0);

    while (queue.length) {
      const cur = queue.shift();
      for (const [node, weight] of graph.get(cur)) {
        if (visited.has(node)) continue;

        weightMap.set(node, weightMap.get(cur) * weight);
        if (node === end) {
          return weightMap.get(end);
        }

        visited.add(node);
        queue.push(node);
      }
    }

    return -1;
  };

  const res = [];
  for (let i = 0; i < queries.length; i++) {
    const [start, end] = queries[i];

    res.push(bfs(start, end));
  }
  return res;
};
