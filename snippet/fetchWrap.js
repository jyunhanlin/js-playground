function fetchWrap(fetchAPI, middleware) {
  if (!middleware || middleware.length < 1) return fetchAPI;

  const innerFetch = middleware.length === 1 ? fetchAPI : fetchWrap(fetchAPI, middleware.slice(1));

  const next = middleware[0];

  const extendedFetch = function (url, options) {
    try {
      return Promise.resolve(next(url, options || {}, innerFetch));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return extendedFetch;
}

const newFetch = fetchWrap(fetch, [middleware1, middleware2, middleware3]);

function middleware1(url, options, innerFetch) {
  // ...

  return innerFetch(url, options);
}

function middleware2(url, options, innerFetch) {
  return innerFetch(url.replace(/^(http:):/, 'https:'), options);
}
