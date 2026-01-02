var minimumAttacks = function (healths) {
  healths.sort((a, b) => a - b);

  let result = 0;
  let damage = 0;

  for (const health of healths) {
    if (damage < health) result += health - damage;

    damage += health;
  }

  return result;
};
