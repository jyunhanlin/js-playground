# Behavioral Patterns

Behavioral patterns decide **who does what** and **who talks to whom**. Most of them do it the same way: they turn a behavior or a state into an object (**reification**). After that, the program can store it, pass it, swap it, or queue it like any other value.

Each note has a `**Reified:**` line under `Core Roles`. This page puts those lines side by side.

## What Each Pattern Turns into an Object

| Pattern | Who does what | Reified | How many objects |
|---|---|---|---|
| [Chain](Chain.md) | Each handler handles the request or passes it on | One handling step | One per step |
| [Command](Command.md) | Invoker triggers and keeps history; receiver does the work | One request | **One per operation** |
| [Interpreter](Interpreter.md) | Each node evaluates its own part of the tree | One grammar rule | **One per tree node** |
| [Iterator](Iterator.md) | Collection stores; iterator walks | Traversal position and order | **One per traversal** |
| [Mediator](Mediator.md) | Colleagues talk only to the mediator | Interaction rules | One per group |
| [Memento](Memento.md) | Originator makes and applies snapshots; caretaker only holds them | State at one moment | **One per save** |
| [Observer](Observer.md) | Subject notifies; each observer decides how to react | Reaction to a change | One per subscriber |
| [State](State.md) | Each state handles its own behavior and picks the next state | One state | One per state |
| [Strategy](Strategy.md) | Context decides when; strategy decides how | One algorithm | One per algorithm |
| [Visitor](Visitor.md) | Elements keep the structure; visitors hold the operations | One operation | One per operation — or per run, see below |
| [Template](Template.md) | Parent fixes the flow; subclasses fill in steps | **Nothing** | — |

## Two Kinds of Lifetime

Ask: **does the object hold its own data?**

- **Yes → one object per occurrence.** Command (`pos`, `text`), Memento (the snapshot), Iterator (the queue or stack), Interpreter (the node's children). The program creates these objects all the time. Each one carries its own copy of the data.
- **No → one object per kind.** Strategy, State, Chain, Observer, Mediator. A small, fixed set of objects that live long. When they have no data, you can share one instance.

Two notes show the edge of this rule:

- **State** — the state classes in `State.md` hold no data, so one shared instance per state is enough. The examples call `new PaidState()` on each transition. That works, but it makes throwaway objects.
- **Visitor** — the visitors in `Visitor.md` collect results (`totalSize`, `results`, `depth`). So each run needs a new instance, and Visitor moves to the "one per occurrence" side.

## The Exception: Template Method

Template Method does not reify anything. The steps that vary are methods, and subclasses override them. The relation is fixed by inheritance, not by composition.

Strategy solves a similar problem with an object. Compare the two in [Template.md](Template.md#template-method-vs-strategy).

## The Comparison Tables Ask the Same Question

The notes already compare some pairs. Each comparison is really about **what gets reified, and how long it lives**:

| Pair | Reified | Main difference |
|---|---|---|
| [Command vs Strategy](Command.md#command-vs-strategy) | A request vs an algorithm | Commands are stored and replayed; a strategy is picked and used |
| [State vs Strategy](State.md#state-vs-strategy) | Both: one object per kind | A state picks the next state itself; the client picks a strategy |
| [Memento vs Command](Memento.md#memento-vs-command-pattern-undo) | Both: one object per occurrence | A memento keeps the result; a command keeps the operation and its inverse |
| [Template vs Strategy](Template.md#template-method-vs-strategy) | A method vs an object | Inheritance vs composition |

## In JavaScript

JS has first-class functions, so many of these roles do not need a class:

| Pattern | Lighter form in JS |
|---|---|
| Strategy | A function: `items.sort((a, b) => a.price - b.price)` |
| Command | A closure: `queue.push(() => sendEmail(to))` — but undo needs a second function, so an object is still easier |
| Iterator | A generator or `[Symbol.iterator]()` (see [Iterator.md](Iterator.md#js-native-symboliterator)) |
| Observer | A callback instead of an object with `update()`. Put a broker in between and it becomes pub-sub — see [PubSub.js](PubSub.js) and [Observer vs Pub-Sub](Observer.md#observer-vs-pub-sub) |

The intent stays the same. Only the container gets lighter.
