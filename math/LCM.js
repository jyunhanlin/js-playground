// Least Common Multiple
// const LCM = (a, b) => (a * b) / GCD(a, b);

const LCM = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};
LCM(12, 7); // 84
LCM(...[1, 3, 4, 5]); // 60
