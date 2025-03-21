const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return num > 1;
};

const primeArr = { 1: 2 };
const getPrime = (n) => {
  return new Promise((resolve) => {
    if (primeArr[n]) resolve(primeArr[n]);
    else {
      let count = Object.keys(primeArr).length;
      let lastNum = primeArr[count];

      const calc = () => {
        setTimeout(() => {
          if (primeArr[count]) {
            if (count === n) {
              return resolve(lastNum);
            }
            count++;
          } else if (isPrime(lastNum)) {
            primeArr[count] = lastNum;

            if (count === n) {
              return resolve(lastNum);
            }
            count++;
          }
          lastNum++;
          calc();
        });
      };

      calc();
    }
  });
};

async function* getPrimeGen(n = 1) {
  let curPrime = await getPrime(n);
  let nextN = n + 1;

  while (true) {
    const nextPrime = await getPrime(nextN);
    const next = yield curPrime;

    if (next && next.done) break;

    if (!next || next === n + 1) {
      curPrime = nextPrime;
      nextN = nextN + 1;
    } else if (typeof next === 'number') {
      curPrime = await getPrime(next);
      nextN = next + 1;
    }
  }
}

(async () => {
  const gen = getPrimeGen();
  console.log(await gen.next()); // return { value: 2, done: false }
  console.log(await gen.next(500)); // return { value: 3571, done: false }, may take some time
  console.log(await gen.next(501)); // return { value: 3581, done: false }, instantly (nice to have)
  console.log(await gen.next(1000)); // return { value: 7919, done: false }, may take some time
  console.log(await gen.next(1000000)); // return { value: 15485863, done, false }, and do not block the main thread)
  console.log(await gen.next({ done: true })); // return { value: undefined, done: true }
})();
