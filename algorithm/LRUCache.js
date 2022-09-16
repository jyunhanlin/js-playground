class LRUMapCache {
  constructor({ cacheSize = 10 } = {}) {
    this._cache = new Map();
    this._cacheSize = cacheSize;
  }
  set(key, value) {
    this._cache.set(key, value);

    if (this._cache.size > this._cacheSize) {
      const earliest = this._cache.keys().next().value;
      this.remove(earliest);
    }
  }
  get(key) {
    const value = this._cache.get(key);

    // Register cache hit
    if (this._cache.has(key)) {
      this.remove(key);
      this._cache.set(key, value);
    }
    return value;
  }
  remove(key) {
    this._cache.delete(key);
  }
  clear() {
    this._cache.clear();
  }
}

class LRUObjectCache {
  constructor({ cacheSize = 10 } = {}) {
    this._cache = {};
    this._cacheOrdering = [];
    this._cacheSize = cacheSize;
  }
  set(key, value) {
    this._cache[key] = value;
    this._registerCacheHit(key);

    if (this._cacheOrdering.length > this._cacheSize) {
      const earliest = this._cacheOrdering[0];
      this.remove(earliest);
    }
  }
  get(key) {
    this._registerCacheHit(key);
    return this._cache[key];
  }
  remove(key) {
    this._deleteCacheHit(key);
    delete this._cache[key];
  }
  clear() {
    this._cache = {};
    this._cacheOrdering = [];
  }
  _registerCacheHit(key) {
    this._deleteCacheHit(key);
    this._cacheOrdering.push(key);
  }
  _deleteCacheHit(key) {
    const index = this._cacheOrdering.indexOf(key);
    if (index > -1) {
      this._cacheOrdering.splice(index, 1);
    }
  }
  isValidCacheKey(cacheKey) {
    return typeof cacheKey === 'string' || typeof cacheKey === 'number';
  }
}
