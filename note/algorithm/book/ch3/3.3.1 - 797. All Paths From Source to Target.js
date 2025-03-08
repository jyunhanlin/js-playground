/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const n = graph.length;
  const res = [];
  const path = [];

  const traverse = (start) => {
    path.push(start);

    if (start === n - 1) {
      res.push([...path]);
    }

    for (let i = 0; i < graph[start].length; i += 1) {
      traverse(graph[start][i]);
    }

    path.pop();
  };

  traverse(0);

  return res;
};
