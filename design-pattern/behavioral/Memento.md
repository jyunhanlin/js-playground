# Memento Pattern

Save and restore an object's state without exposing its internals. Instead of recording "what was done" (like Command pattern), save a complete snapshot and restore it directly — like a game save file.

## Core Roles

| Role | Description |
|------|-------------|
| **Originator** | The object whose state is saved/restored — knows how to create and apply snapshots |
| **Memento** | The snapshot itself — stores state, but doesn't expose it to outsiders |
| **Caretaker** | Holds mementos — can store and retrieve them, but cannot read or modify their contents |

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
    // deep copy to prevent external mutation
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

## Memento vs Command Pattern Undo

| | Command Pattern | Memento Pattern |
|---|---|---|
| **How** | Each command records its inverse operation | Save full state snapshot |
| **Memory** | Low — only stores operation deltas | High — full snapshot each time |
| **Best for** | Simple, reversible operations (text editor insert/delete) | Complex state or hard-to-reverse operations (game state) |

## Trade-offs

- **Pro**: Simple, universal undo — no need to figure out inverse operations
- **Pro**: Preserves encapsulation — caretaker can't peek inside the snapshot
- **Con**: Full snapshot each save — expensive if state is large and saves are frequent

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/memento/
