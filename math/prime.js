// isPrime
const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return num > 1;
};

// nthPrime (do not block the main thread)
const primeArr = [2];
const nthPrime = (n) => {
  return new Promise((resolve) => {
    if (primeArr[n - 1]) resolve(primeArr[n - 1]);
    else {
      let count = primeArr.length;
      let curPrime = primeArr[primeArr.length - 1];

      const calc = () => {
        setTimeout(() => {
          if (isPrime(curPrime)) {
            primeArr.push(curPrime);
            count++;
            if (count === n) {
              resolve(curPrime);
            }
          }
          curPrime++;
          calc();
        });
      };

      calc();
    }
  });
};

const nthPrimeWithRAF = (n) => {
  return new Promise((resolve) => {
    if (primeArr[n - 1]) resolve(primeArr[n - 1]);
    else {
      let count = primeArr.length;
      let curPrime = primeArr[primeArr.length - 1];
      let reqId;

      const calc = (taskStartTime) => {
        let taskFinishTime;
        do {
          if (isPrime(curPrime)) {
            if (!primeArr.includes(curPrime)) primeArr.push(curPrime);
            count++;
            if (count === n || count > n) {
              cancelAnimationFrame(reqId);
              resolve(curPrime);
              return;
            }
          }
          curPrime++;
          taskFinishTime = window.performance.now();
          reqId = requestAnimationFrame(calc);
        } while (taskFinishTime - taskStartTime < 3);
      };

      reqId = requestAnimationFrame(calc);
    }
  });
};

// nthPrime (generator version)
const primeMap = [2];
function* nthPrimeGen(n = 1) {
  const findNthPrime = (nth) => {
    if (primeMap[nth - 1]) return primeMap[nth - 1];
    else {
      let count = primeMap.length;
      let prime = primeMap[primeMap.length - 1];
      while (count < nth) {
        prime++;
        while (!isPrime(prime)) {
          prime++;
        }
        count++;
      }
      return prime;
    }
  };

  let curPrime = findNthPrime(n);
  let nextN = n + 1;

  while (true) {
    const nextPrime = findNthPrime(nextN);
    const next = yield curPrime;

    if (next && next.done) break;

    if (!next || next === n + 1) {
      curPrime = nextPrime;
      nextN = nextN + 1;
    } else if (typeof next === 'number') {
      curPrime = findNthPrime(next);
      nextN = next + 1;
    }
  }
}
