var maxPurchase = function (k, m, wallets) {
  const n = wallets.length;

  let count = 0;

  const remainingWallets = wallets.map((money) => {
    if (money >= k) {
      const num = Math.floor(money / k);
      count += num;
      return money - num * k;
    }
    return money;
  });

  remainingWallets.sort((a, b) => b - a);

  for (const money of remainingWallets) {
    let need = k - money;

    if (m >= need) {
      m -= need;
      count += 1;
    } else {
      break;
    }
  }

  count += Math.floor(m / k);

  return count;
};

// time complexity: O(n log n)
// space complexity: O(n)
