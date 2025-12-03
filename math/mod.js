// add

const add = (a, b, k) => (a + b) % k === ((a % k) + (b % k)) % k;
const mul = (a, b, k) => (a * b) % k === ((a % k) * (b % k)) % k;
const sub = (a, b, k) => (a - b + k) % k === ((a % k) - (b % k) + k) % k;
