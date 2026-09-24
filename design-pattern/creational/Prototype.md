# Prototype Pattern

Create new objects by copying a preconfigured instance instead of calling `new` on a known class. The object knows how to copy itself (`clone()`), so the code that asks for a copy never names a concrete class.

## Core Roles

| Role | Description |
|------|-------------|
| **Prototype** | Declares `clone()` |
| **Concrete Prototype** | Implements `clone()` — decides what to copy shallow and what to copy deep |
| **Registry** (optional) | Stores ready-made prototypes by key; clients ask it for copies |
| **Client** | Gets new objects by cloning — never calls a concrete constructor |

## Example: Monster Spawner

A game spawns many monsters from a few templates. Each template is configured once (stats, skills). Spawning = clone the template, then set the position.

### Prototype

```js
class Monster {
  constructor(name, hp, skills) {
    this.name = name;
    this.hp = hp;
    this.skills = skills;
    this.position = { x: 0, y: 0 };
  }

  clone() {
    const copy = Object.create(Object.getPrototypeOf(this)); // keep the real class
    Object.assign(copy, this);                               // copy every field (shallow)
    copy.skills = [...this.skills];                          // deep-copy what can change
    copy.position = { ...this.position };
    return copy;
  }

  toString() {
    const { x, y } = this.position;
    return `${this.name} HP:${this.hp} at (${x},${y}) skills:[${this.skills}]`;
  }
}

class EliteMonster extends Monster {
  constructor(name, hp, skills, aura) {
    super(name, hp, skills);
    this.aura = aura; // a string — the inherited clone() copies it as is
  }
  toString() {
    return `${super.toString()} aura:${this.aura}`;
  }
}
```

`EliteMonster` does not override `clone()`. `Object.getPrototypeOf(this)` keeps the subclass, and `Object.assign` copies the extra field.

### Registry

```js
class MonsterSpawner {
  #prototypes = new Map();

  register(key, prototype) {
    this.#prototypes.set(key, prototype);
  }

  spawn(key, x, y) {
    const monster = this.#prototypes.get(key).clone();
    monster.position = { x, y };
    return monster;
  }
}
```

### Usage

```js
const spawner = new MonsterSpawner();
spawner.register('goblin', new Monster('Goblin', 30, ['Stab']));
spawner.register('orc-boss', new EliteMonster('Orc Boss', 300, ['Smash', 'Roar'], 'Fire'));

const g1 = spawner.spawn('goblin', 1, 2);
const g2 = spawner.spawn('goblin', 5, 5);
g1.skills.push('Dodge'); // only g1 learns it

console.log(g1.toString()); // Goblin HP:30 at (1,2) skills:[Stab,Dodge]
console.log(g2.toString()); // Goblin HP:30 at (5,5) skills:[Stab]

const boss = spawner.spawn('orc-boss', 9, 9);
console.log(boss.toString());             // Orc Boss HP:300 at (9,9) skills:[Smash,Roar] aura:Fire
console.log(boss instanceof EliteMonster); // true
```

`MonsterSpawner` never names `Monster` or `EliteMonster`. A new monster kind is one `register()` call with a configured instance — no new class, no new factory.

## Shallow vs Deep Copy

`clone()` is the whole pattern, and its hard part is deciding what to copy deep. With only `Object.assign`, every copy shares the same `skills` array:

```js
const template = new Monster('Slime', 10, ['Bounce']);
const a = Object.assign(Object.create(Monster.prototype), template);
a.skills.push('Split');
console.log(template.skills); // [ 'Bounce', 'Split' ] — the template changed too
```

| Field type | Copy |
|---|---|
| Primitive (`hp`, `name`) | Shallow is enough |
| Array / object the copy may change (`skills`, `position`) | Deep copy |
| Shared, immutable data (a texture, a config) | Keep the reference on purpose — that is [Flyweight](../structural/Flyweight.md) |

### Why not `structuredClone()`?

`structuredClone()` deep-copies data, but it drops the class. The copy is a plain object:

```js
const copy = structuredClone(new Monster('Goblin', 30, ['Stab']));
console.log(copy instanceof Monster); // false
console.log(typeof copy.clone);       // undefined
```

It suits plain data (JSON-like state). For class instances, write `clone()`.

## JS `prototype` ≠ Prototype Pattern

The names match, but the mechanisms differ:

| | Prototype pattern | JS prototype chain (`Object.create`) |
|---|---|---|
| **What happens** | The object is **copied** | The new object **links** to the old one; nothing is copied |
| **Change the original later** | Copies are unaffected | Linked objects see the change (unless they set their own value) |

```js
const base = { hp: 30, skills: ['Stab'] };
const linked = Object.create(base);

base.hp = 99;
console.log(linked.hp); // 99 — read through the link

linked.skills.push('Dodge');
console.log(base.skills); // [ 'Stab', 'Dodge' ] — same array
```

`clone()` above uses `Object.create` only to keep the class; the fields are copied with `Object.assign`.

## Prototype vs Factory Method

| | Factory Method | Prototype |
|---|---|---|
| **Who knows the concrete class** | A creator subclass | The prototype object itself |
| **New variant** | New creator subclass | Register a configured instance |
| **Main risk** | Class count grows | A wrong `clone()` (shared mutable fields) |

## Trade-offs

- **Pro**: Client code never names concrete classes — it only calls `clone()`
- **Pro**: New variants are configured instances, not new classes
- **Pro**: Skips expensive setup when the template is costly to build
- **Con**: Deep vs shallow copy must be decided per field — easy to get wrong
- **Con**: Circular references and private (`#`) fields need extra care in `clone()`

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
