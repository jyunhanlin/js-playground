# Flyweight Pattern

When a system needs many similar objects, extract the shared, unchanging parts into reusable "flyweight" objects. Each instance only stores its unique data + a reference to the shared flyweight. Massive memory savings when shared data is large.

## Core Idea: Split State

| State | Description | Storage |
|-------|-------------|---------|
| **Intrinsic** | Shared, immutable across instances (e.g. terrain texture) | Inside the flyweight |
| **Extrinsic** | Unique to each instance (e.g. coordinates) | Inside the context object |

## Core Roles

| Role | Description |
|------|-------------|
| **Flyweight** | Stores intrinsic state, shared by many contexts |
| **Flyweight Factory** | Caches and returns flyweights — ensures one instance per type |
| **Context** | Holds extrinsic state + a reference to a flyweight |

## Example: Game Map Tiles

A 1000×1000 map = 1,000,000 tiles. Only 3 terrain types (grass, water, mountain). Without flyweight, each tile stores its own copy of texture/speed/passable — millions of duplicated bytes. With flyweight, those 1M tiles share just 3 terrain objects.

### Flyweight (intrinsic state)

```js
class TerrainType {
  constructor(name, texture, speedFactor, passable) {
    this.name = name;
    this.texture = texture;
    this.speedFactor = speedFactor;
    this.passable = passable;
  }
  render(x, y) {
    console.log(`Render ${this.name} [${this.texture}] at (${x},${y})`);
  }
}
```

### Flyweight Factory

```js
class TerrainFactory {
  static cache = new Map();

  static get(name, texture, speedFactor, passable) {
    if (!this.cache.has(name)) {
      this.cache.set(name, new TerrainType(name, texture, speedFactor, passable));
      console.log(`New terrain type: ${name}`);
    }
    return this.cache.get(name);
  }

  static count() {
    return this.cache.size;
  }
}
```

### Context (extrinsic state)

```js
class MapTile {
  constructor(x, y, terrain) {
    this.x = x;
    this.y = y;
    this.terrain = terrain; // shared reference
  }
  render() {
    this.terrain.render(this.x, this.y);
  }
}
```

### Usage

```js
const map = [];
for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    let terrain;
    if (x < 300) {
      terrain = TerrainFactory.get('Grass', 'grass.png', 1.0, true);
    } else if (x < 600) {
      terrain = TerrainFactory.get('Water', 'water.png', 0.5, false);
    } else {
      terrain = TerrainFactory.get('Mountain', 'mountain.png', 0.3, true);
    }
    map.push(new MapTile(x, y, terrain));
  }
}

console.log('Map tiles:', map.length);          // 1,000,000
console.log('Terrain types:', TerrainFactory.count()); // 3
```

Output:
```
New terrain type: Grass
New terrain type: Water
New terrain type: Mountain
Map tiles: 1000000
Terrain types: 3
```

1M tiles share only 3 flyweights. Each `MapTile` holds just two numbers and one reference.

## Flyweight vs Singleton

| | Singleton | Flyweight |
|---|---|---|
| **Instance count** | Exactly one — globally | One per type — many flyweights can coexist |
| **Purpose** | Global shared point of access | Memory optimization via sharing |
| **Example** | App config, logger | Terrain types, glyph fonts, particles |

Singleton = "globally unique". Flyweight = "shared per category".

## Real-world Examples

- **Glyph rendering**: each character object shares a font glyph (TerrainType-equivalent) but has its own position
- **DOM virtual nodes**: React reuses Fiber node prototypes
- **String interning**: JS engines deduplicate identical string literals automatically
- **Game particles, sprites, UI icons**: anything where you have thousands of "the same thing in different places"

## Trade-offs

- **Pro**: Massive memory savings when many objects share state
- **Pro**: Centralized cache makes it easy to update shared data
- **Con**: Code complexity — must split state into intrinsic vs extrinsic
- **Con**: Overkill if object count is small or shared state is trivial

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/flyweight/
