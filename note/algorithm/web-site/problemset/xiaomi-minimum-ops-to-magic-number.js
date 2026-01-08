var minMagicOps = function (a, b) {
  const queue = [1];

  let count = 0;
  const visited = new Set([1]);

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i += 1) {
      const num = queue.shift();

      if (num === b) return count;

      // first case: multiply by a
      let nextNum = num * a;
      if (!visited.has(nextNum)) {
        if (nextNum <= b) {
          visited.add(nextNum);
          queue.push(nextNum);
        } else {
          if (nextNum > 10 && nextNum % 10 !== 0) {
            let rotatedNextNum = rotateLastDigitToFront(nextNum);

            if (rotatedNextNum <= b) {
              visited.add(nextNum);
              queue.push(nextNum);
            }
          }
        }
      }

      // second case: rotate the last digit to the front
      if (num >= 10 && num % 10 !== 0) {
        let rotatedNextNum = rotateLastDigitToFront(num);
        if (!visited.has(rotatedNextNum)) {
          visited.add(rotatedNextNum);
          queue.push(rotatedNextNum);
        }
      }
    }

    count += 1;
  }

  return -1;
};

// time complexity: O(V + E), worst case: O(10^(k + 1)), k is the number of digits of b
// space complexity: O(V)

function rotateLastDigitToFront(n) {
  const s = String(n);
  const rotated = s.slice(-1) + s.slice(0, -1);
  return Number(rotated);
}
