var countSimilarArticles = function (likes, k) {
  const obj = {};

  let count = 0;
  for (const like of likes) {
    const target = like ^ k;
    if (obj[target]) count += obj[target];

    obj[like] = (obj[like] || 0) + 1;
  }

  return count;
};
