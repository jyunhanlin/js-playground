window.onerror = (message, source, lineno, colno, error) => {
  console.log({ message, source, lineno, colno, error });

  // return true => prevent default
  return true;
};

window.addEventListener(
  'error',
  (e) => {
    const { message, filename, lineno, colno, error, target } = e;
    if (e instanceof ErrorEvent) {
      console.log('js error', { message, filename, lineno, colno, error });
    } else {
      console.log('resource error', { target });
    }
  },
  true
);

const parseStack = (stack) => {
  const results = stack.split('\n');
  const topFile = results[1].trim().split(' ')[1];
  const regResults = topFile.match(/(.*)?\:(\d+)\:(\d+)$/);
  const [, filename, lineno, colno] = regResults;
  return { filename, lineno: +lineno, colno: +colno };
};

window.addEventListener(
  'unhandledrejection',
  (e) => {
    console.log(e.reason.message);
    const { filename, lineno, colno } = parseStack(e.reason.stack);
    console.log(filename, lineno, colno);
    console.log(e.reason.stack);
  },
  true
);

const originalConsoleError = console.error;
console.error = (...args) => {
  // don something
  originalConsoleError.apply(console, args);
};

// parse error
try {
  throw 1;
} catch (error) {
  console.log(error.stack); // undefined
  console.log(error); // undefined
}

const parseNormalError = (e) => {
  const { message, filename, lineno, colno, error } = e;
  const detail = {
    msg: message,
    resourceUrl: filename,
    lineNo: lineno,
    colNo: colno,
    stack: error instanceof Error ? error.stack : JSON.stringify(error),
  };
  return detail;
};

const parseUnhandledrejection = (e) => {
  const detail = {
    msg: '',
    resourceUrl: '',
    lineNo: -1,
    colNo: -1,
    stack: '',
  };
  if (e.reason instanceof Error) {
    const { filename, lineno, colno } = parseStack(e.reason.stack);
    detail.msg = e.reason.message;
    detail.resourceUrl = filename;
    detail.lineNo = lineno;
    detail.colNo = colno;
    detail.stack = e.reason.stack;
  } else {
    detail.stack = JSON.stringify(e.reason);
  }
  return detail;
};

const getAllAttrs = (dom) => {
  const attrs = {};
  for (let i = 0; ; i++) {
    const temp = dom.attributes[i];
    if (!temp) {
      return attrs;
    }
    attrs[temp.name] = temp.value;
  }
};

const parseResourceError = (e) => {
  const { target } = e;
  const detail = {
    tag: target.nodeName,
    resourceUrl: target.src,
    attrs: getAllAttrs(target),
  };
  return detail;
};

const parseError = (e) => {
  if (e instanceof ErrorEvent) {
    return parseNormalError(e);
  } else if (e instanceof PromiseRejectionEvent) {
    return parseUnhandledrejection(e);
  } else if (e instanceof Event) {
    return parseResourceError(e);
  }
};
