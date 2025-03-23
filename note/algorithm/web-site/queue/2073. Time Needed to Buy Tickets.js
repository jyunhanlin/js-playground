/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  let res = 0;

  for (let i = 0; i < tickets.length; i += 1) {
    if (i <= k) res += Math.min(tickets[k], tickets[i]);
    else res += Math.min(tickets[k] - 1, tickets[i]);
  }

  return res;
};
