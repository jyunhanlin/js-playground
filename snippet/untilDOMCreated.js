const untilDOMCreated = ({ elementId, timeout }) =>
  new Promise((resolve, reject) => {
    let timer;

    const domObserver = new MutationObserver(() => {
      const element = document.getElementById(elementId);

      if (element) {
        if (timer) clearTimeout(timer);
        resolve(element);
        observer.disconnect();
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    if (timeout) timer = setTimeout(reject, timeout);
  });
