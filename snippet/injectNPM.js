let pkg_name_origin = null;
const npmInstall = (originName) => {
  const name = originName.trim();
  pkg_name_origin = name;
  if (/^https?:\/\//.test(name)) return injectScript(name);
  if (name.indexOf('@') !== -1) return unpkg(name);
  return cdnjs(name);
};

const injectScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.onload = () => {
    console.log(pkg_name_origin, ' success');
  };
  script.onerror = () => {
    console.log(pkg_name_origin, ' failed');
  };
  document.body.appendChild(script);
};

const unpkg = (name) => {
  injectScript(`https://unpkg.com/${name}`);
};

const cdnjs = async (name) => {
  const searchPromise = await fetch(`https://api.cdnjs.com/libraries?search=${name}`, {
    referrerPolicy: 'no-referrer',
  });
  const { results, total } = await searchPromise.json();
  if (total === 0) {
    console.error('Sorry, ', name, ' not found, please try another keyword.');
    return;
  }

  const { name: exactName, latest: url } = results[0];
  if (name !== exactName) {
    console.log(name, ' not found, import ', exactName, ' instead.');
  }
  injectScript(url);
};
