/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  // BFS and adjacency list

  const adj = {};
  const visited = new Array(n).fill(Infinity);
  visited[src] = 0;

  for (let i = 0; i < flights.length; i += 1) {
    const [from, to, price] = flights[i];
    if (!adj[from]) adj[from] = [];
    adj[from].push([to, price]);
  }

  const queue = [[src, 0]];
  while (k >= 0 && queue.length > 0) {
    k -= 1;
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const [curNode, curPrice] = queue.shift();
      if (adj[curNode]) {
        for (let j = 0; j < adj[curNode].length; j += 1) {
          const [nextNode, nextPrice] = adj[curNode][j];
          const newPrice = curPrice + nextPrice;
          if (newPrice < visited[nextNode]) {
            visited[nextNode] = newPrice;
            queue.push([nextNode, newPrice]);
          }
        }
      }
    }
  }

  return visited[dst] === Infinity ? -1 : visited[dst];
};
