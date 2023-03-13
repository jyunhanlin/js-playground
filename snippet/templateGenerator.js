/**
 * destructure the object into function scope
 * 1. with
 * 2. eval
 * refer to: https://stackoverflow.com/questions/31907970/how-do-i-destructure-all-properties-into-the-current-scope-closure-in-es2015
 */

function parse(template) {
  // return some code
}

function compiler(template) {
  const prepended = `
    var __str__ = "";
    var __code__ = "";
    for(var key in __data__) {
      __str__ += ("var " + key + "=__data__[\'" + key + "\'];");
    }
    eval(__str__);
  `;

  const source = parse(template);

  const appended = '\n;return __code__;\n';

  const code = prepended + source + appended;

  try {
    const render = new Function('__data__', code);
    render.toString = function () {
      return code;
    };
    return render;
  } catch (e) {
    e.compiled = `function anonymous(__data__) {' ${code} '}`;
    throw e;
  }
}

function template(template, data) {
  if (typeof template !== 'string') {
    return '';
  }

  try {
    const render = compiler(template);
    return render(data);
  } catch (e) {
    console.log(e);
    return 'error';
  }
}
