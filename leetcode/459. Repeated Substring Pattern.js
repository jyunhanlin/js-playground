/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  const sLen = s.length;

  for (let i = 1; i < s.length; i += 1) {
    const substr = s.substr(0, i);

    const substrArr = s.split(substr);

    const substrLen = substr.length;

    if (!(sLen % substrLen) && sLen / substrLen + 1 === substrArr.length) return true;
  }

  return false;
};

var repeatedSubstringPattern = function (s) {
  return s.repeat(2).slice(1, -1).includes(s);
};

var repeatedSubstringPattern = function (s) {
  let i = 1,
    len = s.length;
  while (i <= Math.floor(len / 2)) {
    if (s.slice(0, i).repeat(len / i) == s) return true;
    i++;
  }
  return false;
};
