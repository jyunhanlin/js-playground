# State Pattern

Encapsulate each state as its own class. The object delegates behavior to its current state object, which also decides when and how to transition to the next state. Eliminates if-else chains on state fields.

## Core Roles

| Role | Description |
|------|-------------|
| **Context** | Holds the current state object, delegates all operations to it |
| **State Interface** | Defines all operations that vary by state |
| **Concrete State** | Implements behavior for one state + transition logic to other states |

## Example 1: Order State Machine

An e-commerce order flows through: Pending Payment → Paid → Shipped → Completed (or Cancelled). Same action behaves differently depending on current state.

```
| State           | pay()      | ship()     | confirm()  | cancel()   |
|-----------------|------------|------------|------------|------------|
| Pending Payment | → Paid     | reject     | reject     | → Cancelled|
| Paid            | reject     | → Shipped  | reject     | → Refund   |
| Shipped         | reject     | reject     | → Completed| reject     |
| Completed       | reject     | reject     | reject     | reject     |
```

### State classes

```js
class PendingPaymentState {
  pay(order) {
    console.log('Payment success');
    order.setState(new PaidState());
  }
  ship(order) { console.log('Not paid, cannot ship'); }
  confirm(order) { console.log('Not paid, cannot confirm'); }
  cancel(order) {
    console.log('Order cancelled');
    order.setState(new CancelledState());
  }
}

class PaidState {
  pay(order) { console.log('Already paid'); }
  ship(order) {
    console.log('Order shipped');
    order.setState(new ShippedState());
  }
  confirm(order) { console.log('Not shipped, cannot confirm'); }
  cancel(order) {
    console.log('Refund processing');
    order.setState(new CancelledState());
  }
}

class ShippedState {
  pay(order) { console.log('Already paid'); }
  ship(order) { console.log('Already shipped'); }
  confirm(order) {
    console.log('Order confirmed, completed');
    order.setState(new CompletedState());
  }
  cancel(order) { console.log('Already shipped, cannot cancel'); }
}

class CompletedState {
  pay(order) { console.log('Order completed'); }
  ship(order) { console.log('Order completed'); }
  confirm(order) { console.log('Order completed'); }
  cancel(order) { console.log('Order completed, cannot cancel'); }
}

class CancelledState {
  pay(order) { console.log('Order cancelled'); }
  ship(order) { console.log('Order cancelled'); }
  confirm(order) { console.log('Order cancelled'); }
  cancel(order) { console.log('Order cancelled'); }
}
```

### Context

```js
class Order {
  constructor() {
    this.state = new PendingPaymentState();
  }
  setState(state) { this.state = state; }
  pay() { this.state.pay(this); }
  ship() { this.state.ship(this); }
  confirm() { this.state.confirm(this); }
  cancel() { this.state.cancel(this); }
}
```

### Usage

```js
const order = new Order();

order.ship();    // Not paid, cannot ship
order.pay();     // Payment success
order.pay();     // Already paid
order.ship();    // Order shipped
order.cancel();  // Already shipped, cannot cancel
order.confirm(); // Order confirmed, completed
```

Adding a new state (e.g. "Returning") only requires a new class — no changes to existing states.

## Example 2: Article Publishing Workflow

Draft → Reviewing → Published, with reject going back to Draft.

```js
class DraftState {
  edit(article) { console.log('Editing draft'); }
  submit(article) {
    console.log('Submitted for review');
    article.setState(new ReviewingState());
  }
  approve(article) { console.log('Draft cannot be approved directly'); }
  reject(article) { console.log('Draft does not need rejection'); }
}

class ReviewingState {
  edit(article) { console.log('In review, cannot edit'); }
  submit(article) { console.log('Already in review'); }
  approve(article) {
    console.log('Approved, article published');
    article.setState(new PublishedState());
  }
  reject(article) {
    console.log('Rejected, back to draft');
    article.setState(new DraftState());
  }
}

class PublishedState {
  edit(article) { console.log('Published, cannot edit'); }
  submit(article) { console.log('Already published'); }
  approve(article) { console.log('Already published'); }
  reject(article) {
    console.log('Retracted to draft');
    article.setState(new DraftState());
  }
}

class Article {
  constructor() { this.state = new DraftState(); }
  setState(state) { this.state = state; }
  edit() { this.state.edit(this); }
  submit() { this.state.submit(this); }
  approve() { this.state.approve(this); }
  reject() { this.state.reject(this); }
}
```

## State vs Strategy

| | Strategy | State |
|---|---|---|
| **Who switches** | Client (external) picks a strategy | State object (internal) decides the transition |
| **Mutual awareness** | Strategies don't know about each other | States know which state to transition to |
| **Semantics** | "Different ways to do the same thing" | "Different behavior at different lifecycle phases" |

## Trade-offs

- **Pro**: Eliminates state if-else chains — each state is self-contained
- **Pro**: Adding new states doesn't require modifying existing state classes
- **Con**: Overkill for 2-3 simple states — a switch-case may be clearer

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/state/
