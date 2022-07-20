function getBlobURL(module) {
  const jsCode = module.innerHTML;
  const blob = new Blob([jsCode], { type: 'text/javascript' });
  const blobURL = URL.createObjectURL(blob);
  return blobURL;
}

const map = { imports: {}, scopes: {} };

window.inlineImport = async (moduleID) => {
  const { imports } = map;
  let blobURL = null;
  if (moduleID in imports) blobURL = imports[moduleID];
  else {
    const module = document.querySelector(`script[type="inline-module"]${moduleID}`);
    if (module) {
      blobURL = getBlobURL(module);
      imports[moduleID] = blobURL;
    }
  }
  if (blobURL) {
    const result = await import(blobURL);
    return result;
  }
  return null;
};
