class FIFOMapCache {
  constructor({ cacheSize = 5 } = {}) {
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
    return this._cache.get(key);
  }
  remove(key) {
    this._cache.delete(key);
  }
  clear() {
    this._cache.clear();
  }
}

class FIFOObjectCache {
  constructor({ cacheSize = 5 } = {}) {
    this._cache = {};
    this._cacheOrdering = [];
    this._cacheSize = cacheSize;
  }
  set(key, value) {
    this._cache[key] = value;
    this._cacheOrdering.push(key);

    if (this._cacheOrdering.length > this._cacheSize) {
      const earliest = this._cacheOrdering[0];
      this.remove(earliest);
    }
  }
  get(key) {
    return this._cache[key];
  }
  remove(key) {
    const index = this._cacheOrdering.indexOf(key);

    if (index > -1) {
      this._cacheOrdering.splice(index, 1);
    }
    delete this._cache[key];
  }
  clear() {
    this._cache = {};
    this._cacheOrdering = [];
  }
  isValidCacheKey(cacheKey) {
    return typeof cacheKey === 'string' || typeof cacheKey === 'number';
  }
}
