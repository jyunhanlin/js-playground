/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const res = [];
  const track = [];
  const n = s.length;

  const backtrack = (index) => {
    if (track.length === 4 && index === n) {
      res.push(track.join('.'));
      return;
    }

    for (let i = index; i < n; i += 1) {
      const ip = s.substring(index, i + 1);

      if ((ip.length > 1 && ip.startsWith('0')) || +ip > 255) continue;

      track.push(ip);

      backtrack(i + 1);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};
