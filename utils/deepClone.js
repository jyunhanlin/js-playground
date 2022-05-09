// ref: https://www.cnblogs.com/MomentYY/p/16126868.html

// Easy
// drawbacks: function, undefined, Symbol can not be cloned
JSON.stringify();
JSON.parse();

// Medium
function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === 'object' || valueType === 'function');
}

function deepClone(originValue) {
  if (!isObject(originValue)) {
    return originValue;
  }

  const newObj = {};

  // for in will get the properties from the parent, so need the hasOwnProperty
  for (const key in originValue) {
    if (originValue.hasOwnProperty(key)) {
      newObj[key] = deepClone(originValue[key]);
    }
  }

  return newObj;
}

// Completed
function deepClone(originValue) {
  if (typeof originValue === 'function') {
    return originValue;
  }

  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }

  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }

  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }

  if (typeof originValue === 'undefined') {
    return undefined;
  }

  if (!isObject(originValue)) {
    return originValue;
  }

  const newValue = Array.isArray(originValue) ? [] : {};

  for (const key in originValue) {
    if (originValue.hasOwnProperty(key)) {
      newValue[key] = deepClone(originValue[key]);
    }
  }

  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newValue[sKey] = deepClone(originValue[sKey]);
  }

  return newValue;
}

// avoid self reference
function deepClone(originValue, wMap = new WeakMap()) {
  if (typeof originValue === 'function') {
    return originValue;
  }

  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }

  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }

  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }

  if (typeof originValue === 'undefined') {
    return undefined;
  }

  if (!isObject(originValue)) {
    return originValue;
  }

  if (wMap.has(originValue)) {
    return wMap.get(originValue);
  }

  const newValue = Array.isArray(originValue) ? [] : {};

  wMap.set(originValue, newValue);

  for (const key in originValue) {
    if (originValue.hasOwnProperty(key)) {
      // 递归调用deepClone，如果对象属性值中还包含对象，就会再次进行拷贝处理
      newValue[key] = deepClone(originValue[key], wMap);
    }
  }

  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newValue[sKey] = deepClone(originValue[sKey], wMap);
  }

  return newValue;
}
