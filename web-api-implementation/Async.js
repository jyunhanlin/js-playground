function generatorWrap(generatorFn) {
  const generator = generatorFn();

  function handle(yielded) {
    if (!yielded.done) {
      yielded.value.then((result) => handle(generator.next(result)));
    }
  }

  return handle(generator.next());
}

generatorWrap(function* () {
  const result1 = yield promiseA();
  const result2 = yield promiseB(result1);
  const result3 = yield promiseC(result2);
  const result4 = yield promiseB(result3);
  yield done(result4);
});
