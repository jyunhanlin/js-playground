# Proxy Pattern

A proxy implements the same interface as the real object and stands between client and target. The client only knows the interface — it doesn't see the proxy. The proxy controls access: caching, rate limiting, lazy loading, permission checks, etc.

## Core Roles

| Role | Description |
|------|-------------|
| **Subject** | Common interface shared by proxy and real object |
| **Real Subject** | The actual object that does the work |
| **Proxy** | Wraps the real subject, intercepts calls to add behavior |

## Common Variants

| Variant | Purpose | Example |
|---------|---------|---------|
| **Cache Proxy** | Avoid repeated expensive calls | Memoized API client |
| **Protection Proxy** | Access control / rate limiting | Auth check, request throttling |
| **Virtual Proxy** | Lazy initialization | Placeholder until heavy resource loads |
| **Remote Proxy** | Hide remote location | RPC client stub (gRPC, Dubbo) |

## Example 1: Cache Proxy

Image downloader where the same URLs are requested repeatedly. The proxy caches results so duplicates skip the network.

```js
class RemoteImageService {
  download(url) {
    console.log(`  [Download] Remote: ${url}`);
    return new Uint8Array([1, 2, 3]);
  }
}

class CachedImageService {
  constructor(realService) {
    this.realService = realService;
    this.cache = new Map();
  }
  download(url) {
    if (this.cache.has(url)) {
      console.log(`  [Cache] Hit: ${url}`);
      return this.cache.get(url);
    }
    const data = this.realService.download(url);
    this.cache.set(url, data);
    return data;
  }
}

class ImageApp {
  constructor(service) {
    this.service = service; // depends only on the interface
  }
  renderPage() {
    this.service.download('avatar/user_1.jpg');
    this.service.download('avatar/user_2.jpg');
    this.service.download('avatar/user_1.jpg');
    this.service.download('banner/top.jpg');
    this.service.download('avatar/user_1.jpg');
  }
}
```

```js
// Direct
new ImageApp(new RemoteImageService()).renderPage();
//   [Download] Remote: avatar/user_1.jpg
//   [Download] Remote: avatar/user_2.jpg
//   [Download] Remote: avatar/user_1.jpg
//   [Download] Remote: banner/top.jpg
//   [Download] Remote: avatar/user_1.jpg

// Through proxy
new ImageApp(new CachedImageService(new RemoteImageService())).renderPage();
//   [Download] Remote: avatar/user_1.jpg
//   [Download] Remote: avatar/user_2.jpg
//   [Cache] Hit: avatar/user_1.jpg
//   [Download] Remote: banner/top.jpg
//   [Cache] Hit: avatar/user_1.jpg
```

`ImageApp` doesn't change a single line. The proxy is swapped in at construction time.

## Example 2: Protection Proxy (Rate Limiting)

A third-party API allows max N calls per minute. The proxy enforces the limit so business code stays clean.

```js
class WeatherApiClient {
  getWeather(city) {
    console.log(`Calling remote API for ${city}`);
    return `${city}: sunny, 25°C`;
  }
}

class RateLimitedWeatherService {
  constructor(realService, maxCallsPerMinute) {
    this.realService = realService;
    this.maxCalls = maxCallsPerMinute;
    this.timestamps = [];
  }
  getWeather(city) {
    const now = Date.now();
    // drop calls older than 60s
    this.timestamps = this.timestamps.filter(t => now - t <= 60_000);

    if (this.timestamps.length >= this.maxCalls) {
      throw new Error(`Rate limit exceeded: max ${this.maxCalls} calls/min`);
    }

    this.timestamps.push(now);
    return this.realService.getWeather(city);
  }
}
```

```js
const service = new RateLimitedWeatherService(new WeatherApiClient(), 60);
console.log(service.getWeather('Tokyo'));
```

## JS Native: `new Proxy()`

ES6 has a built-in `Proxy` that intercepts property access without writing wrapper classes:

```js
const realService = new RemoteImageService();
const cache = new Map();

const cachedService = new Proxy(realService, {
  get(target, prop) {
    if (prop === 'download') {
      return (url) => {
        if (cache.has(url)) {
          console.log(`  [Cache] Hit: ${url}`);
          return cache.get(url);
        }
        const data = target.download(url);
        cache.set(url, data);
        return data;
      };
    }
    return target[prop];
  },
});

cachedService.download('avatar/user_1.jpg'); // Remote
cachedService.download('avatar/user_1.jpg'); // Cache hit
```

`Proxy` traps include `get`, `set`, `has`, `deleteProperty`, `apply`, `construct`. Useful for reactive frameworks (Vue 3 reactivity is built on `Proxy`), validation, logging, and access control without modifying the original object.

## Proxy vs Decorator

Both wrap an object behind the same interface. The difference is **intent**:

| | Proxy | Decorator |
|---|---|---|
| **Purpose** | Control access to the real object | Add new behavior to an object |
| **Who composes** | Framework / factory — client doesn't know | Client explicitly stacks decorators |
| **Awareness** | Client sees just the interface | Client builds the wrap chain |

```js
// Decorator: client explicitly composes layers
const handler = new LoggingMiddleware(
  new AuthMiddleware(
    new BusinessHandler()
  )
);

// Proxy: client only sees the interface, no idea proxy exists
const app = new ImageApp(imageService);
```

If your intent is "add a caching layer of behavior" → decorator. If your intent is "control how the client accesses this resource" → proxy. The code can look identical, but the design intent differs.

## Trade-offs

- **Pro**: Adds cross-cutting concerns (cache/auth/throttle) without modifying the real object or client
- **Pro**: Client-real-object coupling stays clean — both depend only on the interface
- **Con**: Extra indirection — adds overhead in hot paths
- **Con**: One proxy class per interface — verbose for fat interfaces (use `Proxy` API instead)

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/proxy/
