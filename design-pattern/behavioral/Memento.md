# Memento Pattern

Save and restore an object's state without exposing its internals. Instead of recording "what was done" (like Command pattern), save a complete snapshot and restore it directly — like a game save file.

## Core Roles

| Role | Description |
|------|-------------|
| **Originator** | The object whose state is saved/restored — knows how to create and apply snapshots |
| **Memento** | The snapshot itself — stores state, but doesn't expose it to outsiders |
| **Caretaker** | Holds mementos — can store and retrieve them, but cannot read or modify their contents |

**Reified:** the state at one moment. One object per save.

## Example: Game Save System

An RPG character has position, HP, EXP, and inventory. Save a snapshot before a boss fight, restore it when defeated.

### Memento (snapshot)

```js
class GameSave {
  constructor(x, y, hp, exp, inventory) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.exp = exp;
    // copy the array so later changes to the character don't leak into the save
    // (a shallow copy is enough here: the items are strings)
    this.inventory = [...inventory];
  }
}
```

### Originator (game character)

```js
class GameCharacter {
  constructor(x, y, hp) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.exp = 0;
    this.inventory = [];
  }

  save() {
    return new GameSave(this.x, this.y, this.hp, this.exp, this.inventory);
  }

  restore(save) {
    this.x = save.x;
    this.y = save.y;
    this.hp = save.hp;
    this.exp = save.exp;
    this.inventory = [...save.inventory];
  }

  moveTo(x, y) { this.x = x; this.y = y; }
  takeDamage(dmg) { this.hp -= dmg; }
  gainExp(amt) { this.exp += amt; }
  addItem(item) { this.inventory.push(item); }

  status() {
    return `Pos: (${this.x},${this.y}) HP: ${this.hp} EXP: ${this.exp} Bag: [${this.inventory}]`;
  }
}
```

### Caretaker (save manager)

```js
class SaveManager {
  constructor() {
    this.saves = [];
  }
  saveGame(character) {
    this.saves.push(character.save());
  }
  loadGame(index) {
    return this.saves[index];
  }
}
```

### Usage

```js
const hero = new GameCharacter(0, 0, 100);
const manager = new SaveManager();

console.log(hero.status());
// Pos: (0,0) HP: 100 EXP: 0 Bag: []

// fight monsters, get loot
hero.moveTo(10, 20);
hero.gainExp(50);
hero.addItem('Iron Sword');
console.log(hero.status());
// Pos: (10,20) HP: 100 EXP: 50 Bag: [Iron Sword]

// save before boss
manager.saveGame(hero);

// boss fight goes badly
hero.moveTo(30, 40);
hero.takeDamage(80);
hero.gainExp(20);
console.log(hero.status());
// Pos: (30,40) HP: 20 EXP: 70 Bag: [Iron Sword]

// reload save
hero.restore(manager.loadGame(0));
console.log(hero.status());
// Pos: (10,20) HP: 100 EXP: 50 Bag: [Iron Sword]
```

## Enforcing It in JS

The example above relies on convention. `GameSave` has public fields, so the caretaker *can* change a save:

```js
const save = manager.loadGame(0);
save.hp = 9999; // nothing stops this
```

JS has no `friend` keyword, so a memento class cannot say "only the originator may read me". One way to enforce it: the originator keeps the real snapshots in a module-private `WeakMap` and hands out an empty, frozen token. The caretaker stores tokens but has nothing to read.

```js
// module scope — only the originator can see this
const snapshots = new WeakMap();

class SealedCharacter extends GameCharacter {
  save() {
    const token = Object.freeze({});
    snapshots.set(token, {
      x: this.x, y: this.y, hp: this.hp, exp: this.exp,
      inventory: [...this.inventory],
    });
    return token;
  }
  restore(token) {
    const s = snapshots.get(token);
    Object.assign(this, s, { inventory: [...s.inventory] });
  }
}
```

```js
const knight = new SealedCharacter(0, 0, 100);
const saves = new SaveManager(); // same caretaker as before, unchanged
saves.saveGame(knight);

const token = saves.loadGame(0);
console.log(Object.keys(token)); // [] — nothing to read
token.hp = 9999;                 // ignored (throws in strict mode): the token is frozen

knight.takeDamage(50);
knight.restore(saves.loadGame(0));
console.log(knight.status());
// Pos: (0,0) HP: 100 EXP: 0 Bag: []
```

A `WeakMap` also lets a snapshot be garbage-collected once the caretaker drops its token.

## Memento vs Command Pattern Undo

| | Command Pattern | Memento Pattern |
|---|---|---|
| **How** | Each command records its inverse operation | Save full state snapshot |
| **Memory** | Low — only stores operation deltas | High — full snapshot each time |
| **Best for** | Simple, reversible operations (text editor insert/delete) | Complex state or hard-to-reverse operations (game state) |

## Trade-offs

- **Pro**: Simple, universal undo — no need to figure out inverse operations
- **Pro**: Preserves encapsulation — the caretaker stores snapshots without knowing what is inside (in JS, enforced only with the `WeakMap` token above)
- **Con**: Full snapshot each save — expensive if state is large and saves are frequent

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/memento/
