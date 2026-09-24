# Structural Patterns

Structural patterns decide **how objects connect**. Most of them add a wrapper: an object that sits in front of another object and forwards calls to it. Adapter, Decorator, Proxy, and Facade all have this "wrap and forward" shape, so the code alone often cannot tell them apart.

Ask three questions instead:

1. **What does it wrap?** One object, a whole subsystem, a tree of children — or nothing?
2. **Does the interface change?**
3. **Who builds the wrap, and does the client know it is there?**

## The Three Questions, Per Pattern

| Pattern | Wraps | Interface | Who builds it / does the client know? | Intent |
|---|---|---|---|---|
| [Adapter](Adapter.md) | One object with the wrong interface | **Changes** to what the client expects | Set up once at integration; client sees only the target interface | Convert |
| [Decorator](Decorator.md) | One object | Same | **Client stacks the layers** and picks the order | Enhance |
| [Proxy](Proxy.md) | One object | Same | **Injected**; client does not know | Control access |
| [Facade](Facade.md) | A whole subsystem | New and smaller | The facade creates the subsystem objects itself | Simplify |
| [Composite](Composite.md) | Many children, recursively | Same as a leaf | Client builds the tree | Treat one and many the same |
| [Bridge](Bridge.md) | Not a wrapper — holds an object from a second hierarchy | — | Client picks the pair at construction | Separate two dimensions |
| [Flyweight](Flyweight.md) | Not a wrapper — shares one object among many | — | A factory hands out the shared instance | Save memory |

## Same Code, Different Pattern

The first four rows can have identical code. Two cases in these notes show it:

- **Cache** — `UserDaoCacheDecorator` in [Decorator.md](Decorator.md#example-1-cache-decorator) and `CachedImageService` in [Proxy.md](Proxy.md#example-1-cache-proxy) are almost the same class. In Decorator.md the client stacks it; in Proxy.md it is injected and `ImageApp` cannot tell. Question 3 decides the name.
- **Middleware** — the middleware chain in [Decorator.md](Decorator.md#example-2-http-middleware-chain) is a decorator stack. But `AuthMiddleware` can skip `next.handle()`, and then it acts like [Chain of Responsibility](../behavioral/Chain.md).

## How This Relates to Behavioral Patterns

In [behavioral/](../behavioral/README.md), most patterns turn a behavior or a state into an object (reification). Structural patterns mostly do not. The extra object is a **wrapper layer**, not a concept made into an object.

Two exceptions:

- **Bridge** turns one whole dimension (the send channel) into an object. That is the same move as Strategy — see [Bridge vs Strategy](Bridge.md#bridge-vs-strategy).
- **Flyweight** turns the shared intrinsic state into an object. It is the opposite of Command: Command makes many objects on purpose, Flyweight makes as few as possible.

## The Comparison Tables in the Notes

| Comparison | Question it answers |
|---|---|
| [Adapter vs other wrapping patterns](Adapter.md#adapter-vs-other-wrapping-patterns) | Does the interface change? |
| [Decorator vs other wrapping patterns](Decorator.md#decorator-vs-other-wrapping-patterns) | Who composes the layers? |
| [Proxy vs Decorator](Proxy.md#proxy-vs-decorator) | Does the client know about the wrap? |
| [Facade vs Adapter](Facade.md#facade-vs-adapter) | Simplify, or convert? |
| [Bridge vs other wrapping patterns](Bridge.md#bridge-vs-other-wrapping-patterns) | Designed up front, or fixed after the fact? |
| [Bridge vs Strategy](Bridge.md#bridge-vs-strategy) | One dimension, or two? |
| [Composite + Visitor](Composite.md#composite--visitor) | Add element types, or add operations? |
| [Flyweight vs Singleton](Flyweight.md#flyweight-vs-singleton) | One per type, or one in total? |

## In JavaScript

JS has lighter forms for some of these wrappers:

| Pattern | Lighter form in JS |
|---|---|
| Proxy | The built-in `new Proxy(target, handler)` — see [Proxy.md](Proxy.md#js-native-new-proxy) |
| Decorator | A higher-order function that wraps a function |
| Facade | A module that re-exports a small API: `export { convert } from './video/index.js'` |

A higher-order function is a decorator without a class:

```js
const withCache = (fn) => {
  const cache = new Map();
  return (key) => {
    if (!cache.has(key)) cache.set(key, fn(key));
    return cache.get(key);
  };
};

const getUserName = withCache((id) => {
  console.log(`Query DB: id=${id}`);
  return `User${id}`;
});

getUserName(1); // Query DB: id=1
getUserName(1); // (cache hit, no log)
```
