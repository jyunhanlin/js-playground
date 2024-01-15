const cookieTest = (iFrameUri, callBack) => {
  const messageHandler = (event) => {
    const data = JSON.parse(event.data);
    callBack(data['result']);
    window.removeEventListener('message', messageHandler);
    document.body.removeChild(frame);
  };

  window.addEventListener('message', messageHandler);

  const frame = document.createElement('iframe');
  frame.src = iFrameUri;
  frame.sandbox = 'allow-scripts allow-same-origin';
  frame.style = `display:none`;
  frame.onload = (e) => {
    frame.contentWindow.postMessage(JSON.stringify({ test: 'cookie' }), '*');
  };

  document.body.appendChild(frame);
};

export default cookieTest;

// the iframe content
const html = /* html */ `
<!doctype html>
<html>
<head>
</head>
<body>
  <script>
    const checkCookiesEnable = () => {
      let isCookieEnabled = (window.navigator.cookieEnabled) ? true : false;
      if (typeof window.navigator.cookieEnabled == "undefined" && !isCookieEnabled) {
        document.cookie = "testcookie";
        isCookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
      }
      return isCookieEnabled;
    }
    (function () {
      window.addEventListener('message', event => {
        try {
          let data = JSON.parse(event.data)
          if (data['test'] !== 'cookie')
            return
          let result = checkCookiesEnable();

          parent.postMessage(JSON.stringify({
            'result': result
          }), event.origin);
        }
        catch (e) {
          console.error(e)
        }
      });
    })();
  </script>
</body>
</html>

`;
