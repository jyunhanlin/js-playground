/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function (scores, ages) {
  const len = scores.length;

  const agesAndScores = [];
  for (let i = 0; i < len; i += 1) {
    agesAndScores.push([ages[i], scores[i]]);
  }

  agesAndScores.sort((a, b) => a[0] - b[0]);

  let res = 0;
  const helper = (index, oldestAge, minScore, score) => {
    if (index >= len) {
      res = Math.max(score, res);
    } else {
      const currentAge = agesAndScores[index][0];
      const currentScore = agesAndScores[index][1];

      if (oldestAge === -1 && minScore === -1) {
        helper(index + 1, currentAge, currentScore, score + currentScore);
      } else if (
        (currentAge > oldestAge && currentScore > minScore) ||
        (currentAge <= oldestAge && currentScore <= minScore)
      ) {
        helper(
          index + 1,
          Math.min(currentAge, oldestAge),
          Math.min(minScore, currentScore),
          score + currentScore
        );
      }

      helper(index + 1, oldestAge, minScore, score);
    }
  };

  helper(0, -1, -1, 0);

  return res;
};

var bestTeamScore = function (scores, ages) {
  const dp = {};
  const len = scores.length;

  const agesAndScores = [];
  for (let i = 0; i < len; i += 1) {
    agesAndScores.push([ages[i], scores[i]]);
  }

  agesAndScores.sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    //for same score we want to have higher age first
    return b[0] - a[0];
  });

  const helper = (index, minAge) => {
    let key = `${index}-${minAge}`;
    if (dp[key] !== undefined) {
      return dp[key];
    }
    //console.log(index,minAge)
    let max = 0;
    if (index === len) {
      //console.log(index,arr.length)
      return 0;
    }
    if (agesAndScores[index][0] <= minAge) {
      //take this player
      let res = helper(index + 1, agesAndScores[index][0]) + agesAndScores[index][1];
      max = Math.max(max, res);
    }
    //don't take this player
    let res = helper(index + 1, minAge);
    max = Math.max(max, res);
    //console.log("max",max)
    dp[key] = max;
    return max;
  };

  return helper(0, Infinity);
};
