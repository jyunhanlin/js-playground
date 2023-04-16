function generatorWrapPromise(generatorFn) {
  const generator = generatorFn();

  return new Promise((resolve, reject) => {
    const handle = (yielded) => {
      if (yielded.done) resolve(yielded.value);

      yielded.value.then((res) => handle(generator.next(res))).catch(reject);
    };

    handel(generator.next());
  });
}

(async () => {
  const promiseA = () => Promise.resolve('a');
  const promiseB = (input) => Promise.resolve(input + 'b');
  const promiseC = (input) => Promise.resolve(input + 'c');
  const promiseD = (input) => Promise.resolve(input + 'd');

  const result = await generatorWrapPromise(function* () {
    const result1 = yield promiseA();
    const result2 = yield promiseB(result1);
    const result3 = yield promiseC(result2);
    const result4 = yield promiseD(result3);
    return result4;
  });

  console.log(result);
})();
