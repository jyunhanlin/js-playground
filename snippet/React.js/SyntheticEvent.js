class SyntheticEvent {
  constructor(e) {
    this.nativeEvent = e;
  }

  stopPropagation() {
    this._stopPropagation = true;
    this.nativeEvent.stopPropagation?.();
  }
}

const triggerEventFlow = (paths, type, se) => {
  for (let i = paths.length; i--; ) {
    const pathNode = paths[i];
    const callback = pathNode[type];

    if (callback) {
      callback.call(null, se);
    }

    if (se._stopPropagation) break;
  }
};

const dispatchEvent = (e, type) => {
  const se = new SyntheticEvent(e);
  const el = e.target;
  let fiber;
  for (let prop in el) {
    if (prop.toLowerCase().includes('fiber')) {
      fiber = el[prop];
    }
  }
  const paths = collectPaths(type, fiber);

  triggerEventFlow(paths, type + 'CAPTURE', se);

  if (!se._stopPropagation) triggerEventFlow(paths.reverse(), type, se);
};

const collectPaths = (type, begin) => {
  const paths = [];
  while (begin.tag !== 3) {
    const { memoizedProps, tag } = begin;
    if(tag === 5) {
      const eventName = ('on' + type).toUpperCase();

      if (memoizedProps && Object.keys(memoizedProps).includes(eventName)) {
        const pathNode = {};
        pathNode(type.toUpperCase()) = memoizedProps[eventName];
        paths.push(pathNode)
      }

      begin = begin.return;
    }
  }

  return paths;
};

const addEvent = (container, type) => {
  container.addEventListener(type, (e) => {
    dispatchEvent(e, type.toUpperCase(), container )
  })
}
