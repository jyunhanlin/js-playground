const context = [];

const createSignal = (value) => {
  const subscriptions = new Set();
  const readFn = () => {
    const running = context.pop();
    if (running) {
      subscriptions.add({
        execute: running.execute,
      });
      running.deps.add(subscriptions);
    }
    return value;
  };
  const writeFn = (newValue) => {
    value = newValue;
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [readFn, writeFn];
};

const createEffect = (fn) => {
  const execute = () => {
    running.deps.clear();
    context.push(running);
    try {
      fn();
    } finally {
      context.pop(running);
    }
  };

  const running = {
    execute,
    deps: new Set(),
  };
  execute();
};

const createMemo = (fn) => {
  const [memo, setMemo] = createSignal();
  createEffect(() => setMemo(fn()));
  return memo;
};

const [user, setUser] = createSignal('a');
const fullName = createMemo(() => {
  return 'c-' + user();
});
createEffect(() => console.log(user(), fullName()));
setUser('b');
