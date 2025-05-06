/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const emailToIndexes = new Map();
  for (let i = 0; i < accounts.length; i += 1) {
    const account = accounts[i];
    for (let j = 1; j < account.length; j += 1) {
      const email = account[j];
      if (!emailToIndexes.has(email)) emailToIndexes.set(email, []);
      emailToIndexes.get(email).push(i);
    }
  }

  const res = [];
  const visited = new Set();

  for (const email of emailToIndexes.keys()) {
    if (visited.has(email)) continue;

    const mergedEmail = [];
    const q = [];
    q.push(email);
    visited.add(email);

    while (q.length > 0) {
      const curEmail = q.shift();
      mergedEmail.push(curEmail);
      const indexes = emailToIndexes.get(curEmail);
      for (let index of indexes) {
        const account = accounts[index];
        for (let j = 1; j < account.length; j += 1) {
          const nextEmail = account[j];
          if (!visited.has(nextEmail)) {
            q.push(nextEmail);
            visited.add(nextEmail);
          }
        }
      }
    }
    const accountIndex = emailToIndexes.get(email)[0];
    const username = accounts[accountIndex][0];
    mergedEmail.sort();
    mergedEmail.unshift(username);
    res.push(mergedEmail);
  }

  return res;
};
