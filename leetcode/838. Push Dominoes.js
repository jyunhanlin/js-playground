/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
  const len = dominoes.length;
  const result = [dominoes[0]];

  let index = 1;

  while (index < len) {
    const cur = dominoes[index];

    if (cur === 'R') {
      result.push(cur);
    } else if (cur === '.') {
      if (result[index - 1] === 'R') {
        result.push(result[index - 1]);
      } else {
        result.push(cur);
      }
    } else {
      let backIndex = index - 1;
      result.push(cur);
      while (backIndex >= 0) {
        if (dominoes[backIndex] === 'L') {
          break;
        } else if (dominoes[backIndex] === 'R') {
          let left = index;
          let right = backIndex;
          while (right < left) {
            result[right] = 'R';
            result[left] = 'L';
            left -= 1;
            right += 1;
          }
          if (left === right) result[left] = '.';
          break;
        } else if (result[backIndex] === '.') {
          result[backIndex] = cur;
        }
        backIndex -= 1;
      }
    }
    index += 1;
  }

  return result.join('');
};
