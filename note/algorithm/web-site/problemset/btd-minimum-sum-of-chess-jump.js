var minimumSumOfChessJump = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  if (m < 3 || n < 3) return -1;

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity));

  dp[0][0] = matrix[0][0];
  const queue = [[dp[0][0], 0, 0]];

  const DIR = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  while (queue.length) {
    const size = queue.length;

    for (let count = 0; count < size; count += 1) {
      const [dist, x, y] = queue.shift();
      if (dist > dp[x][y]) continue;

      for (let i = 0; i < DIR.length; i += 1) {
        const nextX = x + DIR[i][0];
        const nextY = y + DIR[i][1];

        if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue;

        const newDist = dist + matrix[nextX][nextY];

        if (newDist >= dp[nextX][nextY]) continue;

        dp[nextX][nextY] = newDist;
        queue.push([dp[nextX][nextY], nextX, nextY]);
      }
    }
  }

  return dp[m - 1][n - 1] === Infinity ? -1 : dp[m - 1][n - 1];
};

// time complexity: O(m * n * 8)
// space complexity: O(m * n)

// Time Limit Exceeded
var minimumSumOfChessJump = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  if (m < 3 || n < 3) return -1;

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity));

  dp[0][0] = matrix[0][0];
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);
  pq.enqueue([dp[0][0], 0, 0]);

  const DIR = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];

  while (pq.size()) {
    const [dist, x, y] = pq.dequeue();
    if (dist > dp[x][y]) continue;

    for (let i = 0; i < DIR.length; i += 1) {
      const nextX = x + DIR[i][0];
      const nextY = y + DIR[i][1];

      if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue;

      const newDist = dist + matrix[nextX][nextY];

      if (newDist >= dp[nextX][nextY]) continue;

      dp[nextX][nextY] = newDist;
      pq.enqueue([dp[nextX][nextY], nextX, nextY]);
    }
  }

  return dp[m - 1][n - 1] === Infinity ? -1 : dp[m - 1][n - 1];
};

// time complexity: O(m * n * log(m * n))
// space complexity: O(m * n)

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  peek() {
    return this._heap[0];
  }

  isEmpty() {
    return this._heap.length === 0;
  }

  _parent(idx) {
    return Math.floor((idx - 1) / 2);
  }

  _leftChild(idx) {
    return idx * 2 + 1;
  }

  _rightChild(idx) {
    return idx * 2 + 2;
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _compare(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  enqueue(value) {
    this._heap.push(value);
    this._siftUp();

    return this.size();
  }

  _siftUp() {
    let nodeIdx = this.size() - 1;

    while (0 < nodeIdx && this._compare(nodeIdx, this._parent(nodeIdx))) {
      this._swap(nodeIdx, this._parent(nodeIdx));
      nodeIdx = this._parent(nodeIdx);
    }
  }

  dequeue() {
    if (this.size() > 1) {
      this._swap(0, this.size() - 1);
    }

    const poppedValue = this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  _siftDown() {
    let nodeIdx = 0;

    while (
      (this._leftChild(nodeIdx) < this.size() &&
        this._compare(this._leftChild(nodeIdx), nodeIdx)) ||
      (this._rightChild(nodeIdx) < this.size() && this._compare(this._rightChild(nodeIdx), nodeIdx))
    ) {
      const greaterChildIdx =
        this._rightChild(nodeIdx) < this.size() &&
        this._compare(this._rightChild(nodeIdx), this._leftChild(nodeIdx))
          ? this._rightChild(nodeIdx)
          : this._leftChild(nodeIdx);

      this._swap(greaterChildIdx, nodeIdx);
      nodeIdx = greaterChildIdx;
    }
  }
}
