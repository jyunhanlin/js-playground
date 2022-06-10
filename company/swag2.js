// implement flat
Array.prototype.myFlat = function () {
  return this.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? b.myFlat() : b);
  }, []);
};

console.log([1, 2, 3, 4, 5].myFlat()); // [1, 2, 3, 4, 5]
console.log([1, 2, [3, 4, 5]].myFlat()); // [1, 2, 3, 4, 5]
console.log([1, [2, [3, [4, [5]]]]].myFlat()); // [1, 2, 3, 4, 5]

Array.prototype.myFlatMap = function (callback) {
  return this.myFlat().map(callback);
};

// implement flatMap
console.log([1, 2, 3, 4, 5].myFlatMap((x) => x * x)); // [1, 4, 9, 16, 25]
console.log([1, 2, [3, 4, 5]].myFlatMap((x) => x + 1)); // [2, 3, 4, 5, 6]
console.log([1, [2, [3, [4, [5]]]]].myFlatMap((x) => x * 2)); // [2, 4, 6, 8, 10]

function argsCount(...a) {
  if (a.length === 0) return 0;
  let count = a.length;

  const f = (...b) => {
    if (b.length === 0) return count;
    count += b.length;
    return f;
  };
  return f;
}

// create argsCount funtion
console.log(argsCount()); // 0
console.log(argsCount(1)()); // 1
console.log(argsCount(1)(1)()); // 2
console.log(argsCount(1, 1, 1)()); // 3
console.log(argsCount(1)(1, 1)(1)()); // 4
console.log(argsCount(1)); // function
console.log(argsCount(1)(1, 1)(1)); // function

// isPrime
const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return num > 1;
};

console.log(isPrime(2687)); // true
console.log(isPrime(9087)); // false

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
            } else {
              curPrime++;
              calc();
            }
          } else {
            curPrime++;
            calc();
          }
        });
      };

      calc();
    }
  });
};

(async () => {
  console.log(await nthPrime(50));
  console.log(await nthPrime(1000)); // should be 541
  console.log(await nthPrime(501)); // should be 5
})();

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

const gen = nthPrimeGen();
console.log(gen.next()); // return { value: 2, done: false }
console.log(gen.next(500)); // return { value: 3571, done: false }, may take some time
console.log(gen.next(501)); // return { value: 3581, done: false }, instantly (nice to have)
console.log(gen.next(1000)); // return { value: 7919, done: false }, may take some time
console.log(gen.next({ done: true })); // return { value: undefined, done: true }
