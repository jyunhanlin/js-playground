/**
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
  const graph = Array.from({ length: bombs.length }, () => []);

  for (let i = 0; i < bombs.length; i += 1) {
    for (let j = 0; j < bombs.length; j += 1) {
      if (i === j) continue;
      if (
        Math.pow(bombs[i][0] - bombs[j][0], 2) + Math.pow(bombs[i][1] - bombs[j][1], 2) <=
        Math.pow(bombs[i][2], 2)
      ) {
        graph[i].push(j);
      }
    }
  }

  let max = 0;
  for (let i = 0; i < bombs.length; i++) {
    let count = 0;
    const q = [];
    const visited = Array(graph.length).fill(0);
    q.push(i);
    visited[i] = true;
    while (q.length) {
      const node = q.shift();
      count++;
      for (const neighbor of graph[node]) {
        if (!visited[neighbor]) {
          q.push(neighbor);
          visited[neighbor] = 1;
        }
      }
    }

    max = Math.max(max, count);
  }
  return max;
};
