var minTaxiFare = function (n, edges, s, t1, t2) {
  const graph = new Array(n + 1).fill().map(() => []);

  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  const dijkstra = (start) => {
    const dist = new Array(n + 1).fill(Infinity);
    dist[start] = 0;

    const pq = new MinPriorityQueue({ compare: (a, b) => a[0] - b[0] });
    pq.enqueue([0, start]);

    while (!pq.isEmpty()) {
      const [d, u] = pq.dequeue();

      if (d > dist[u]) continue;

      for (const [v, w] of graph[u]) {
        if (dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          pq.enqueue([dist[v], v]);
        }
      }
    }

    return dist;
  };

  const distS = dijkstra(s);
  const distT1 = dijkstra(t1);
  const distT2 = dijkstra(t2);

  let minCost = Infinity;
  for (let x = 1; x <= n; x += 1) {
    if (distS[x] !== Infinity && distT1[x] !== Infinity && distT2[x] !== Infinity) {
      const cost = distS[x] + distT1[x] + distT2[x];
      minCost = Math.min(minCost, cost);
    }
  }
  return minCost;
};
