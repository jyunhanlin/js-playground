# Mediator Pattern

Introduce a mediator object to coordinate interactions between multiple objects, turning a complex mesh of dependencies (N×N) into a simple star topology. Each object only talks to the mediator, unaware of others.

## Core Roles

| Role | Description |
|------|-------------|
| **Mediator** | Coordinates all colleague objects, holds the interaction logic |
| **Colleague** | Only communicates with the mediator, never directly with other colleagues |

## Example 1: Air Traffic Control

Multiple aircraft need to coordinate landing/takeoff. Without a tower, N planes need N×(N-1)/2 communication channels. With a tower, each plane only talks to one place.

```js
class AirportTower {
  constructor() {
    this.aircraftList = [];
    this.runwayFree = true;
  }

  register(aircraft) {
    this.aircraftList.push(aircraft);
  }

  requestLanding(aircraft) {
    if (this.runwayFree) {
      this.runwayFree = false;
      aircraft.receive('landing approved');
      this.notifyOthers(aircraft, `${aircraft.callSign} is landing, please wait`);
    } else {
      aircraft.receive('runway busy, please hold');
    }
  }

  requestTakeoff(aircraft) {
    if (this.runwayFree) {
      this.runwayFree = false;
      aircraft.receive('takeoff approved');
      this.notifyOthers(aircraft, `${aircraft.callSign} is taking off, please wait`);
    } else {
      aircraft.receive('runway busy, please wait');
    }
  }

  runwayClear() {
    this.runwayFree = true;
    console.log('Tower: runway is now free');
  }

  notifyOthers(sender, message) {
    for (const a of this.aircraftList) {
      if (a !== sender) a.receive(message);
    }
  }
}

class Aircraft {
  constructor(callSign, tower) {
    this.callSign = callSign;
    this.tower = tower;
    tower.register(this);
  }

  requestLanding() {
    console.log(`${this.callSign} requests landing`);
    this.tower.requestLanding(this);
  }

  requestTakeoff() {
    console.log(`${this.callSign} requests takeoff`);
    this.tower.requestTakeoff(this);
  }

  receive(message) {
    console.log(`${this.callSign} received: ${message}`);
  }
}
```

```js
const tower = new AirportTower();
const f1 = new Aircraft('CA1234', tower);
const f2 = new Aircraft('MU5678', tower);
const f3 = new Aircraft('CZ9012', tower);

f1.requestLanding();
// CA1234 received: landing approved
// MU5678 received: CA1234 is landing, please wait
// CZ9012 received: CA1234 is landing, please wait

f2.requestLanding();
// MU5678 received: runway busy, please hold

tower.runwayClear();
f2.requestLanding();
// MU5678 received: landing approved
```

## Example 2: Chat Room

Users don't message each other directly — the chat room routes all messages.

```js
class ChatRoom {
  constructor() {
    this.users = [];
  }

  register(user) {
    this.users.push(user);
  }

  send(sender, message, to) {
    if (to) {
      // direct message
      to.receive(sender.name, message);
    } else {
      // broadcast
      for (const user of this.users) {
        if (user !== sender) user.receive(sender.name, message);
      }
    }
  }
}

class User {
  constructor(name, room) {
    this.name = name;
    this.room = room;
    room.register(this);
  }

  send(message, to) {
    this.room.send(this, message, to);
  }

  receive(from, message) {
    console.log(`${this.name} received from ${from}: ${message}`);
  }
}
```

```js
const room = new ChatRoom();
const alice = new User('Alice', room);
const bob = new User('Bob', room);
const charlie = new User('Charlie', room);

alice.send('Hello everyone');
// Bob received from Alice: Hello everyone
// Charlie received from Alice: Hello everyone

alice.send('Hey Bob', bob);
// Bob received from Alice: Hey Bob
```

## Mediator vs Facade

| | Facade | Mediator |
|---|---|---|
| **Direction** | One-way — simplifies external access to subsystem | Two-way — coordinates internal objects |
| **Awareness** | Subsystem doesn't know about the facade | Colleagues know and depend on the mediator |
| **Purpose** | Simplify API surface | Decouple peer-to-peer interaction |

## Trade-offs

- **Pro**: Decouples objects — adding a new participant only requires registering with the mediator
- **Pro**: Centralizes interaction logic in one place
- **Con**: Mediator can become a bloated "god object" if interaction logic grows complex

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/mediator/
