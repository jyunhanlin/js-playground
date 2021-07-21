/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  let i1 = 0;
  let i2 = 0;
  for (let i = 0; i < s3.length; i++) {
    const ch = s3.charAt(i);

    if (ch === s1.charAt(i1) && ch === s2.charAt(i2)) {
      const try1ndScenario = isInterleave(s1.substr(i1 + 1), s2.substr(i2), s3.substr(i + 1));
      if (try1ndScenario) {
        return true;
      } else {
        const try2ndScenario = isInterleave(s2.substr(i2 + 1), s1.substr(i1), s3.substr(i + 1));
        if (try2ndScenario) return true;
      }
      return false;
    }

    if (ch === s1.charAt(i1)) {
      i1++;
    } else if (ch === s2.charAt(i2)) {
      i2++;
    } else {
      return false;
    }
  }
  return true;
};

// Input: (s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbcbcac');
// Output: true;
console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));

// Input: (s1 = 'aabcc'), (s2 = 'dbbca'), (s3 = 'aadbbbaccc');
// Output: false;

// Input: (s1 = ''), (s2 = ''), (s3 = '');
// Output: true;
