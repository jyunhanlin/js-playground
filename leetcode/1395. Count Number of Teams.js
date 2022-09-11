/**
 * @param {number[]} rating
 * @return {number}
 */
// brute force
var numTeams = function (rating) {
  let res = 0;

  for (let i = 0; i < rating.length - 2; i += 1) {
    for (let j = i + 1; j < rating.length - 1; j += 1) {
      for (let k = j + 1; k < rating.length; k += 1) {
        if (rating[j] > rating[i] && rating[k] > rating[j]) res += 1;
        else if (rating[i] > rating[j] && rating[j] > rating[k]) res += 1;
        else continue;
      }
    }
  }

  return res;
};

/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  let res = 0;

  const dp = [];

  for (let i = 0; i < rating.length - 2; i += 1) {
    for (let j = i + 1; j < rating.length - 1; j += 1) {
      if (rating[i] > rating[j]) dp.push({ type: 'down', j });
      else if (rating[j] > rating[i]) dp.push({ type: 'up', j });
      else continue;
    }
  }

  for (let i = 0; i < dp.length; i += 1) {
    const { type, j } = dp[i];
    for (let k = j + 1; k < rating.length; k += 1) {
      if (type === 'up' && rating[k] > rating[j]) res += 1;
      else if (type === 'down' && rating[k] < rating[j]) res += 1;
      else continue;
    }
  }

  return res;
};
