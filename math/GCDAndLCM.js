// Greatest Largest Divisor
const GCD = (a, b) => (a % b === 0 ? b : GCD(b, a % b));

// Least Common Multiple
const LCM = (a, b) => (a * b) / GCD(a, b);
