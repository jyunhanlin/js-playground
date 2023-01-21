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

var findTheCity = function (n, edges, distanceThreshold) {
  const distance = new Array(n).fill().map(() => new Array(n).fill(Infinity));

  for (const edge of edges) {
    distance[edge[0]][edge[1]] = distance[edge[1]][edge[0]] = edge[2];
  }

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      for (let k = 0; k < n; ++k) {
        if (k === j) continue;
        distance[j][k] = Math.min(distance[j][k], distance[j][i] + distance[i][k]);
      }
    }
  }

  let city = 0;
  let minNum = n;
  for (let i = 0; i < n; ++i) {
    let curNum = 0;
    for (let j = 0; j < n; ++j) {
      distance[i][j] <= distanceThreshold && ++curNum;
    }
    if (curNum <= minNum) {
      minNum = curNum;
      city = i;
    }
  }
  return city;
};
