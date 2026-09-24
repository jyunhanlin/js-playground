# Creational Patterns

Creational patterns decide **who picks the concrete class**. The rest of the code can then say "give me a logger" without naming `FileLogger`. The pattern is about moving that decision out of the calling code — not about creating objects as such.

Ask three questions:

1. **Who decides which class to `new`?**
2. **When is it decided?**
3. **How many instances come out?**

## The Three Questions, Per Pattern

| Pattern | Who decides the class | When | How many instances | Turned into an object |
|---|---|---|---|---|
| [Factory Method](Factory.md) | A creator subclass (`DevelopmentApp.createLogger()`) | When you pick which creator subclass to instantiate | One product per call | Nothing — it is a method |
| [Abstract Factory](AbstractFactory.md) | The factory object passed in (`DarkThemeFactory`) | At runtime, when the factory is injected | One matching family per factory | The choice of family |
| [Builder](Builder.md) | The builder; in GoF, the director fixes the step order | Step by step, finished by `build()` | One product per `build()` | The assembly process |
| [Prototype](Prototype.md) | The prototype — `clone()` copies its own class | At runtime, when an instance is registered | One copy per `clone()` | A configured instance (the template) |
| [Singleton](Singleton.md) | The class itself | Once — at class load (eager) or first use (lazy) | Exactly one | Nothing — it is a constraint |

## Inheritance vs Composition

The same split as in [behavioral/](../behavioral/README.md) shows up here:

| Creational | Behavioral counterpart | Mechanism |
|---|---|---|
| Factory Method | [Template Method](../behavioral/Template.md) | Inheritance — a subclass fills in one step |
| Abstract Factory | [Strategy](../behavioral/Strategy.md) | Composition — inject an object that does the varying part |

Factory Method is Template Method where the step is "create the product" (see [Factory.md](Factory.md#connection-to-template-method)). Abstract Factory is Strategy where the strategy is "which family to create".

## Where JS Differs from the GoF Book

The GoF examples assume C++/Java features. Several notes fix a gap that appears when the pattern moves to JS:

| GoF assumption | In JS | See |
|---|---|---|
| Private constructors block `new` | No private constructors — use a static block or a private flag | [Singleton.md](Singleton.md#variant-2-lazy-initialization) |
| Threads are the only race | Async init can create two "singletons" — cache the promise | [Singleton.md](Singleton.md#async-initialization) |
| New parameters break callers | Options objects cover most builder use cases | [Builder.md](Builder.md#js-specific-options-object) |
| The parent constructor may call the factory method | Subclass class fields are not set yet — create lazily | [Factory.md](Factory.md#pitfall-calling-the-factory-method-from-the-constructor) |
| "Prototype" means copying | JS `prototype` links, it does not copy | [Prototype.md](Prototype.md#js-prototype--prototype-pattern) |

## The Comparison Tables in the Notes

| Comparison | Question it answers |
|---|---|
| [Factory Method vs Abstract Factory](AbstractFactory.md#factory-method-vs-abstract-factory) | One product by inheritance, or a family by composition? |
| [GoF Builder vs Fluent Builder](Builder.md#gof-builder-vs-fluent-builder) | Different representations, or readable construction? |
| [Prototype vs Factory Method](Prototype.md#prototype-vs-factory-method) | New variant = new class, or new configured instance? |
| [Singleton vs Flyweight](Singleton.md#singleton-vs-flyweight) | One in total, or one per type? |

## Lighter Forms in JS

| Pattern | Lighter form |
|---|---|
| Factory Method | A factory function: `createLogger(env)` |
| Abstract Factory | An object of functions: `{ createButton, createCheckbox }` |
| Builder | An options object: `new Resume({ name, age })` |
| Prototype | `clone()` for class instances; `structuredClone()` for plain data |
| Singleton | A module that exports one instance |
