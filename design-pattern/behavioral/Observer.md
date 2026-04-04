# Observer Pattern

Define a subscription mechanism: when a subject's state changes, all registered observers are automatically notified. The subject doesn't know what the observers do — it just calls `update()`.

## Core Roles

| Role | Description |
|------|-------------|
| **Subject / Publisher** | Maintains observer list, provides `register()`, `unregister()`, `notify()` |
| **Observer** | Implements `update()` — defines reaction to state changes |

## Example 1: Online Auction

Auctioneer (subject) notifies all bidders (observers) when the price changes. Bidders can join or leave at any time.

```js
class LiveAuction {
  constructor(itemName, startingPrice) {
    this.itemName = itemName;
    this.currentPrice = startingPrice;
    this.leadingBidder = 'None';
    this.bidders = [];
  }

  register(bidder) { this.bidders.push(bidder); }

  unregister(bidder) {
    this.bidders = this.bidders.filter(b => b !== bidder);
  }

  notify() {
    for (const bidder of this.bidders) {
      bidder.update(this.itemName, this.currentPrice, this.leadingBidder);
    }
  }

  placeBid(name, price) {
    if (price <= this.currentPrice) {
      console.log(`${name} bids ${price}, below current price`);
      return;
    }
    this.currentPrice = price;
    this.leadingBidder = name;
    console.log(`${name} bids ${price}`);
    this.notify();
  }
}

class OnlineBidder {
  constructor(name) { this.name = name; }
  update(item, price, leader) {
    console.log(`  [${this.name}] ${item}: $${price}, leader: ${leader}`);
  }
}

class BidRecorder {
  constructor() { this.history = []; }
  update(item, price, leader) {
    this.history.push(`${item}: $${price} (${leader})`);
    console.log(`  [Recorder] logged`);
  }
}
```

```js
const auction = new LiveAuction('Antique Vase', 1000);
const alice = new OnlineBidder('Alice');
const bob = new OnlineBidder('Bob');
const recorder = new BidRecorder();

auction.register(alice);
auction.register(bob);
auction.register(recorder);

auction.placeBid('Alice', 1500);
// Alice bids 1500
//   [Alice] Antique Vase: $1500, leader: Alice
//   [Bob] Antique Vase: $1500, leader: Alice
//   [Recorder] logged

auction.unregister(bob); // Bob leaves
auction.placeBid('Alice', 2000);
// Bob no longer notified
```

## Example 2: Game Event Center (Per-Event Subscription)

Instead of notifying all observers for every change, observers subscribe to specific event types. This is closer to real-world usage.

```js
class EventCenter {
  constructor() {
    this.listeners = new Map(); // eventType → listener[]
  }

  subscribe(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  unsubscribe(type, listener) {
    const list = this.listeners.get(type);
    if (list) this.listeners.set(type, list.filter(l => l !== listener));
  }

  publish(type, data) {
    const list = this.listeners.get(type);
    if (list) list.forEach(l => l.onEvent(type, data));
  }
}

class AchievementSystem {
  constructor() { this.killCount = 0; }
  onEvent(type, data) {
    this.killCount++;
    console.log(`  [Achievement] Kills: ${this.killCount}`);
    if (this.killCount === 1) console.log('  [Achievement] Unlocked: First Blood!');
  }
}

class SoundSystem {
  onEvent(type, data) {
    console.log(`  [Sound] ${data.monster} defeated!`);
  }
}
```

```js
const events = new EventCenter();
const achievements = new AchievementSystem();
const sound = new SoundSystem();

events.subscribe('MONSTER_KILLED', achievements);
events.subscribe('MONSTER_KILLED', sound);

events.publish('MONSTER_KILLED', { monster: 'Slime' });
//   [Achievement] Kills: 1
//   [Achievement] Unlocked: First Blood!
//   [Sound] Slime defeated!
```

## Observer vs Pub-Sub

| | Observer | Pub-Sub (EventEmitter) |
|---|---|---|
| **Coupling** | Subject holds direct reference to observer objects | Publisher doesn't know subscribers (only callbacks) |
| **Dispatch** | All observers get every notification | Dispatched by event name/topic |
| **Communication** | Synchronous method call | Can be async, cross-system (Kafka, RabbitMQ) |
| **Use case** | Same-app object-to-object | Decoupled modules, cross-service messaging |

See `PubSub.js` for the EventEmitter implementation.

## Trade-offs

- **Pro**: Loose coupling — adding observers doesn't require changing the subject
- **Pro**: Broadcast — one state change notifies all interested parties
- **Con**: Notification order depends on registration order (don't rely on it)
- **Con**: Memory leak risk if observers register but never unregister
- **Con**: Cascading updates if an observer triggers further state changes

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/observer/
