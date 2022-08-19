window.addEventListener(
  'error',
  function (e) {
    if (!(e instanceof ErrorEvent)) {
      const target = e.target;

      if (target.tagName === 'LINK') {
        const link = document.createElement('link');
        link.href = target.url;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        document.body.appendChild(link);
      }
    }
    // ... other resources
  },
  true
);

function reloadJsResources(urls, index) {
  const url = urls[index];

  const script = document.createElement('script');

  script.src = url;

  script.onload = () => {
    const next = index + 1;
    if (urls[next]) reloadJsResources(urls, next);
  };

  document.head.appendChild(script);
}
