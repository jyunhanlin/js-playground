function primeFactors(n) {
  const factors = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

const randomNumber = Math.floor(Math.random() * 10000);
console.log('Prime factors of', randomNumber + ':', primeFactors(randomNumber).join(' '));
