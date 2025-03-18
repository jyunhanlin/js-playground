/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  // rabin karp
  const nums = new Array(s.length);

  for (let i = 0; i < s.length; i += 1) {
    switch (s[i]) {
      case 'A':
        nums[i] = 0;
        break;
      case 'G':
        nums[i] = 1;
        break;
      case 'C':
        nums[i] = 2;
        break;
      case 'T':
        nums[i] = 3;
        break;
    }
  }

  const seen = new Set();
  const res = new Set();

  const L = 10;
  const R = 4;
  const RL = Math.pow(R, L - 1);

  let left = 0;
  let right = 0;
  let winHash = 0;

  while (right < s.length) {
    winHash = R * winHash + nums[right];
    right += 1;

    if (right - left === L) {
      if (seen.has(winHash)) res.add(s.substring(left, right));
      else seen.add(winHash);

      winHash = winHash - nums[left] * RL;
      left += 1;
    }
  }

  return [...res];
};
