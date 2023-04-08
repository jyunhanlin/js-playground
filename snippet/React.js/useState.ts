/**
 * easy useState implementation
 * 1. no lanes
 * 2. no good schedule
 * 3. no edge cases
 */

let callbackNode: number | undefined = undefined;
let workInProgressHook: Hook | undefined;
let isMount = true;

type Action = (key: any) => void;

interface Fiber {
  memoizedState?: Hook;
  stateNode: () => { click: () => void };
}

interface Hook {
  queue: Queue;
  memoizedState: any;
  next?: Hook;
}

interface Update {
  action: Action;
  next?: Update;
}

interface Queue {
  pending?: Update;
}

const fiber: Fiber = {
  memoizedState: undefined,
  stateNode: App,
};

function schedule() {
  if (callbackNode) clearTimeout(callbackNode);

  callbackNode = setTimeout(() => {
    workInProgressHook = fiber.memoizedState;
    // @ts-ignore
    window.app = fiber.stateNode();
    isMount = false;
  });
}

function dispatchSetState(queue: Queue, action: Action) {
  const update: Update = {
    action,
    next: undefined,
  };

  if (!queue.pending) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }

  queue.pending = update;
  schedule();
}

function useState(initialState: any) {
  let hook: Hook;

  if (isMount) {
    hook = {
      queue: {
        pending: undefined,
      },
      memoizedState: initialState,
      next: undefined,
    };

    if (!fiber.memoizedState) fiber.memoizedState = hook;
    else workInProgressHook!.next = hook;

    workInProgressHook = hook;
  } else {
    hook = workInProgressHook!;
    workInProgressHook = workInProgressHook!.next;
  }

  if (!hook) throw new Error('hook does not exist');

  let baseState = hook.memoizedState;

  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next as Update;
    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next as Update;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = undefined;
  }

  hook.memoizedState = baseState;

  return [baseState, dispatchSetState.bind(null, hook.queue)];
}

function App() {
  const [num, updateNum] = useState(0);

  return {
    click() {
      updateNum((num) => num + 1);
    },
  };
}
