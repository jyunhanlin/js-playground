/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const newEdges = [];
  for (let i = 0; i < edges.length; i += 1) {
    newEdges.push(edges[i]);
    newEdges.push([edges[i][1], edges[i][0], edges[i][2]]);
  }

  const edgeObj = {};
  for (let i = 0; i < newEdges.length; i += 1) {
    let node = newEdges[i][0];
    if (!edgeObj[node]) edgeObj[node] = [];
    edgeObj[node].push(newEdges[i]);
  }

  const helper = (node, threshold) => {
    let res = [];
    if (edgeObj[node])
      for (let i = 0; i < edgeObj[node].length; i += 1) {
        const edge = edgeObj[node][i];
        const neighbor = edge[1];
        const weigth = edge[2];

        if (threshold - weigth >= 0) {
          res.push(neighbor);
          res.push(...helper(neighbor, threshold - weigth));
        }
      }

    return res;
  };

  let res = {};
  for (let i = 0; i < n; i += 1) {
    res[i] = [...new Set(helper(i, distanceThreshold).filter((n) => n !== i))];
  }

  const res2 = Object.keys(res).reduce((acc, cur) => {
    if (!acc[res[cur].length]) acc[res[cur].length] = [];
    acc[res[cur].length].push(cur);
    return acc;
  }, {});

  return Math.max(...res2[Math.min(...Object.keys(res2))]);
};
