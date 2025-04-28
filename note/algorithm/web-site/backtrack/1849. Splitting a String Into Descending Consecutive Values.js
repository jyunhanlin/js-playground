/**
 * @param {string} s
 * @return {boolean}
 */
var splitString = function (s) {
  let found = false;

  const track = [];

  const backtrack = (index) => {
    if (found) return;

    if (index === s.length) {
      if (track.length > 1 && track.join('') === s) found = true;

      return;
    }

    for (let i = index; i < s.length; i += 1) {
      const str = s.substring(index, i + 1);

      if (track.length && +track[track.length - 1] - +str !== 1) continue;

      track.push(str);

      backtrack(i + 1);

      track.pop();
    }
  };

  backtrack(0);

  return found;
};
