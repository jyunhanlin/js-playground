# Decorator Pattern

Wrap an object in another object that implements the same interface, adding behavior before/after delegating to the inner one. The original class isn't modified, decorators can be stacked, and the client controls the composition.

## Core Roles

| Role | Description |
|------|-------------|
| **Component** | The common interface shared by core and decorators |
| **Concrete Component** | The original object being wrapped |
| **Decorator** | Implements the same interface, holds a reference to another component, adds behavior around it |

## Example 1: Cache Decorator

A DAO that queries a database. We want to cache results without touching the original DAO code.

### Component + Concrete Component

```js
// interface (in JS, just a shared shape)
class UserDao {
  getUserNameBy(id) {
    throw new Error('not implemented');
  }
}

class UserDaoImpl extends UserDao {
  getUserNameBy(id) {
    const userName = `User${id}`;
    console.log(`Query DB: id=${id}, username=${userName}`);
    return userName;
  }
}
```

### Decorator

```js
class UserDaoCacheDecorator extends UserDao {
  constructor(decoratedDao) {
    super();
    this.decoratedDao = decoratedDao;
    this.cache = new Map();
  }

  getUserNameBy(id) {
    if (this.cache.has(id)) {
      const userName = this.cache.get(id);
      console.log(`Cache hit, username=${userName}`);
      return userName;
    }
    const userName = this.decoratedDao.getUserNameBy(id);
    this.cache.set(id, userName);
    return userName;
  }
}
```

### Usage

```js
const dao = new UserDaoCacheDecorator(new UserDaoImpl());

dao.getUserNameBy(1);
// Query DB: id=1, username=User1

dao.getUserNameBy(1);
// Cache hit, username=User1
```

`UserDaoImpl` is unchanged. The cache logic lives entirely in the decorator. Want to remove caching? Don't use the decorator. Want to add metrics? Write another decorator and stack it on.

## Example 2: HTTP Middleware Chain

The classic decorator use case: a request passes through a stack of layers (logging, auth, business handler) before producing a response. Each layer wraps the next.

### Component + Core handler

```js
class Handler {
  handle(req, res) {
    throw new Error('not implemented');
  }
}

class BusinessHandler extends Handler {
  handle(req, res) {
    console.log('>>> BusinessHandler');
    if (req.path === '/api/user') {
      res.statusCode = 200;
      res.body = '{"name":"Alice"}';
    } else {
      res.statusCode = 404;
      res.body = 'Not Found';
    }
    console.log('<<< BusinessHandler');
  }
}
```

### Decorators (middlewares)

```js
class LoggingMiddleware extends Handler {
  constructor(next) {
    super();
    this.next = next;
  }
  handle(req, res) {
    console.log('>>> LoggingMiddleware');
    console.log(`Request: ${req.path}`);
    this.next.handle(req, res);
    console.log(`Response status: ${res.statusCode}`);
    console.log('<<< LoggingMiddleware');
  }
}

class AuthMiddleware extends Handler {
  constructor(next) {
    super();
    this.next = next;
  }
  handle(req, res) {
    console.log('>>> AuthMiddleware');
    if (req.headers.authorization === 'valid-token') {
      this.next.handle(req, res);
    } else {
      // Short-circuit: never reaches the next handler
      res.statusCode = 401;
      res.body = 'Unauthorized';
    }
    console.log('<<< AuthMiddleware');
  }
}
```

### Composition

```js
// Build the chain: Logging → Auth → Business
const chain = new LoggingMiddleware(
  new AuthMiddleware(
    new BusinessHandler()
  )
);

// Successful request
const req1 = { path: '/api/user', headers: { authorization: 'valid-token' } };
const res1 = {};
chain.handle(req1, res1);
// >>> LoggingMiddleware
// Request: /api/user
// >>> AuthMiddleware
// >>> BusinessHandler
// <<< BusinessHandler
// <<< AuthMiddleware
// Response status: 200
// <<< LoggingMiddleware

// Failed auth
const req2 = { path: '/api/user', headers: { authorization: 'bad' } };
const res2 = {};
chain.handle(req2, res2);
// >>> LoggingMiddleware → >>> AuthMiddleware → 401 → <<< AuthMiddleware → <<< LoggingMiddleware
```

Notice the **call-stack ordering**: outer middleware enters first and exits last. This is just function call semantics — the outer wrap returns only after the inner wrap returns.

Adding a compression middleware? Just write `CompressionMiddleware` and slot it into the chain — no other code changes.

> **Note**: When `AuthMiddleware` skips `next.handle()`, it's behaving more like Chain of Responsibility (short-circuit). In real-world middleware systems (Express, Koa), the line between Decorator and Chain of Responsibility blurs.

## Decorator vs Other Wrapping Patterns

| | Decorator | Adapter | Proxy |
|---|---|---|---|
| **Purpose** | Add behavior | Convert interface | Control access |
| **Same interface?** | Yes | No (that's the point) | Yes |
| **Who composes** | Client explicitly stacks | N/A | Framework / factory hides it |
| **Mnemonic** | "Enhance functionality" | "Convert interface" | "Control access" |

The key difference between Decorator and Proxy: with Decorator, the **client** chooses which layers to apply and in what order. With Proxy, the wrapping is hidden — the client doesn't know a proxy exists.

## Trade-offs

- **Pro**: Open/Closed Principle — extend behavior without modifying the original class
- **Pro**: Free composition — stack and reorder decorators as needed
- **Pro**: Single responsibility — each decorator handles one concern
- **Con**: Many small classes if every concern becomes a decorator
- **Con**: Debugging through deep chains can be hard to follow

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/decorator/
