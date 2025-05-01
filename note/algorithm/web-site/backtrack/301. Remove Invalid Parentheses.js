/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  const res = [];
  const track = [];

  const isValid = (s) => {
    let left = 0;
    for (let c of s) {
      if (c === '(') {
        left++;
      } else if (c === ')') {
        left--;
        if (left < 0) {
          return false;
        }
      }
    }
    return left === 0;
  };

  const backtrack = (index) => {
    if (index === s.length) {
      const trackStr = track.join('');
      if (isValid(trackStr)) res.push(trackStr);
      return;
    }

    const c = s[index];

    if (c !== '(' && c !== ')') {
      track.push(c);
      backtrack(index + 1);
      track.pop();
    } else {
      track.push(c);
      backtrack(index + 1);
      track.pop();

      backtrack(index + 1);
    }
  };

  backtrack(0);

  const maxLen = Math.max(...res.map((s) => s.length));

  const set = new Set();
  for (const str of res) {
    if (str.length === maxLen) {
      set.add(str);
    }
  }
  return Array.from(set);
};
