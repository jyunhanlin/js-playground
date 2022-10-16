// not work
// Cannot get next URL for redirect="manual"
fetch('/api/user/list', {
  headers: { Authorization: `Bearer xxxxxxxxx` },
  redirect: 'manual', // <-- here, spec say that it cannot get the redirect url,
})
  .then((response) => {
    console.log('response', response);
    if (response.status === 307) {
      const newURL = response.headers.get('location');
      console.log(newURL);
    }
  })
  .catch((e) => {
    console.log(e);
  });

// fetch with XMLHttpRequest
const getRedirectURL = (url, options) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    const { headers = {} } = options;
    Reflect.ownKeys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState === this.DONE) {
        if (this.responseURL && this.responseURL !== url) {
          resolve(this.responseURL);
          this.abort();
          return;
        }
        resolve();
      }
    };
    xhr.onerror = function (e) {
      console.log(e);
      resolve();
    };
  });
};

// response.type="opaqueredirect"
const request = (url, options) =>
  fetch(url, options).then(async (response) => {
    if (response.type === 'opaqueredirect') {
      const redirectURL = await getRedirectURL(url, options);
      if (!redirectURL) {
        throw new Error('no redirectURL');
      }
      return request(redirectURL, options);
    }
    return response.json();
  });

(async () => {
  const result = await request('/api/user/list', {
    headers: { Authorization: `Bearer xxxxxxxxx`, foo: 'bar' },
    redirect: 'manual',
  });
  console.log(result);
})();
