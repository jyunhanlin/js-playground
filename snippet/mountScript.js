// when load the third party script with script tag
// and the onLoad function has to be the query into the src

const mountScript = ({ scriptId, src, scriptOnLoadName, globalOnLoadName }) => {
  let resolveFn;
  let rejectFn;
  const mountPromise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  if (document.getElementById(scriptId)) {
    return mountPromise;
  }

  // Create global onload callback
  window[globalOnLoadName] = resolveFn;

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = `${src}?${scriptOnLoadName}=${window[globalOnLoadName]}`;
  script.async = true;
  script.onerror = () => rejectFn('script-error');

  document.head.appendChild(script);
  return mountPromise;
};
