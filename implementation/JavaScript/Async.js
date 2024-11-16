function asyncImpl(generatorTasksFn) {
  const generator = generatorTasksFn();

  return new Promise((resolve, reject) => {
    const handle = (next) => {
      if (next.done) resolve(next.value);
      return next.value.then((data) => handle(generator.next(data))).catch(reject);
    };

    return handle(generator.next());
  });
}

(async () => {
  const promiseA = () => Promise.resolve('a');
  const promiseB = (input) => Promise.resolve(input + 'b');
  const promiseC = (input) => Promise.resolve(input + 'c');
  const promiseD = (input) => Promise.resolve(input + 'd');

  const result = await asyncImpl(function* () {
    const result1 = yield promiseA();
    const result2 = yield promiseB(result1);
    const result3 = yield promiseC(result2);
    const result4 = yield promiseD(result3);
    return result4;
  });

  console.log(result); // abcd
})();
