// isPrime
const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return num > 1;
};

// getPrime with setTimeout (but setTimeout has min 4s delay)
const primeArr = [2];
const getPrime = (n) => {
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
              return;
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

// getPrime with requestAnimationFrame
const getPrimeWithRAF = (n) => {
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

// getPrime with MessageChannel (like scheduler from react)
const getPrimeWithMessageChannel = (n) => {
  return new Promise((resolve) => {
    if (primeArr[n - 1]) resolve(primeArr[n - 1]);
    else {
      let count = primeArr.length;
      let curPrime = primeArr[primeArr.length - 1];

      const calc = () => {
        const taskStartTime = window.performance.now();
        let taskFinishTime;
        do {
          if (isPrime(curPrime)) {
            if (!primeArr.includes(curPrime)) primeArr.push(curPrime);
            count++;
            if (count === n || count > n) {
              resolve(curPrime);
              return;
            }
          }
          curPrime++;
          taskFinishTime = window.performance.now();
        } while (taskFinishTime - taskStartTime < 3);

        nextTask();
      };

      const channel = new MessageChannel();
      const port = channel.port2;
      channel.port1.onmessage = calc;
      const nextTask = () => port.postMessage(null);
      nextTask();
    }
  });
};

// getPrime (generator version)
const primeMap = [2];
function* getPrimeGen(n = 1) {
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

const primesUp = (num) => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2);
  const sqroot = Math.floor(Math.sqrt(num));
  const numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach((x) => (arr = arr.filter((y) => y % x !== 0 || y === x)));

  return arr;
};

primesUp(10); // [2, 3, 5, 7]
