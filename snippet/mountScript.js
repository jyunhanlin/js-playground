// when load the third party script with script tag
// and the onLoad function has to be the query into the src

const WINDOW_LOAD_FN_NAME = 'windowOnLoad';

// Prevent loading API script multiple times
let resolveFn;
let rejectFn;
const mountPromise = new Promise((resolve, reject) => {
  resolveFn = resolve;
  rejectFn = reject;
});

const mountScript = ({ scriptId, src, params = {} }) => {
  if (document.getElementById(scriptId)) {
    return mountPromise;
  }

  // Create global onload callback
  window[WINDOW_LOAD_FN_NAME] = resolveFn;

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = src;
  script.async = true;
  script.onerror = () => rejectFn('script-error');

  const query = generateQuery(params);
  script.src += query !== '' ? `&${query}` : '';

  document.head.appendChild(script);
  return mountPromise;
};
