/**
 * @param {string} directions
 * @return {number}
 */
var countCollisions = function (directions) {
  const n = directions.length;
  let collideCount = 0;
  const dirArr = directions.split('');
  // turn RL to SS;
  for (let i = 0; i < n - 1; i += 1) {
    if (dirArr[i] === 'R' && dirArr[i + 1] === 'L') {
      collideCount += 2;
      dirArr[i] = 'S';
      dirArr[i + 1] = 'S';
    }
  }

  // for each S -> count R from the left side and count L from the right side
  let i = 0;
  while (i < n) {
    if (dirArr[i] === 'S') {
      let j = i - 1;
      while (j >= 0) {
        if (dirArr[j] === 'S' || dirArr[j] === 'L') break;
        if (dirArr[j] === 'R') {
          collideCount += 1;
          dirArr[j] = 'S';
        }
        j -= 1;
      }

      let k = i + 1;

      while (k < n) {
        if (dirArr[k] === 'S' || dirArr[k] === 'R') break;
        if (dirArr[k] === 'L') {
          collideCount += 1;
          dirArr[k] = 'S';
        }
        k += 1;
      }
    }

    i += 1;
  }

  return collideCount;
};

// time complexity: O(n ^ 2)
// space complexity: O(n)

/**
 * @param {string} directions
 * @return {number}
 */
var countCollisions = function (directions) {
  const n = directions.length;
  let left = 0;
  let right = n - 1;

  // 去掉左邊一串 L
  while (left < n && directions[left] === 'L') left++;

  // 去掉右邊一串 R
  while (right >= 0 && directions[right] === 'R') right--;

  let collisions = 0;
  for (let i = left; i <= right; i++) {
    if (directions[i] !== 'S') {
      collisions++;
    }
  }

  return collisions;
};

// time complexity: O(n)
// space complexity: O(1)
