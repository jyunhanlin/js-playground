/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
  const n = tasks.length;

  const triples = tasks.map((task, i) => [task[0], task[1], i]);

  triples.sort((a, b) => a[0] - b[0]);

  const pq = new PriorityQueue((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });

  const res = [];
  let now = 0;
  let i = 0;
  while (res.length < n) {
    if (pq.size()) {
      const [, processTime, index] = pq.dequeue();
      res.push(index);
      now += processTime;
    } else if (i < n && triples[i][0] > now) {
      now = triples[i][0];
    }

    while (i < n && triples[i][0] <= now) {
      pq.enqueue(triples[i]);
      i += 1;
    }
  }

  return res;
};
