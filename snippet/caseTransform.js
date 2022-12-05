const camelize = (text) =>
  text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });

const decamelize = (str, separator) => {
  separator = typeof separator === 'undefined' ? '_' : separator;

  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .replace(/([\d]+)/g, separator + '$1')
    .toLowerCase();
};

const snakeToCamelCase = (o) => {
  if (typeof o === 'string') {
    return camelize(o);
  } else if (typeof o === 'object') {
    return Object.fromEntries(
      Object.entries(o).map(([key, value]) => {
        if (value && typeof value === 'object') {
          return [camelize(key), snakeToCamelCase(value)];
        }
        return [camelize(key), value];
      })
    );
  }
};

const camelCaseToSnake = (o) => {
  if (typeof o === 'string') {
    return decamelize(o);
  } else if (typeof o === 'object') {
    return Object.fromEntries(
      Object.entries(o).map(([key, value]) => {
        if (value && typeof value === 'object') {
          return [decamelize(key), camelCaseToSnake(value)];
        }
        return [decamelize(key), value];
      })
    );
  }
};
