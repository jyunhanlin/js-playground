var minLexString = function (s) {
  const str = s.split('');

  let i = 0;
  let count = 0;
  while (i < str.length && count < 2) {
    if (str[i] === 'p') {
      str[i] = '';
      count += 1;
    }
    i += 1;
  }

  i = str.length - 1;
  count = 0;

  while (i >= 0 && count < 2) {
    if (str[i] === 'o') {
      str[i] = '';
      count += 1;
    }
    i -= 1;
  }

  return str.filter(Boolean).join('');
};
