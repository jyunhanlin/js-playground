let str = '0123456789';
let temp = '';

while (str.length !== 10240) {
  str = str + '0123456789';
}

const computedTotal = () => {
  localStorage.clear();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      try {
        localStorage.setItem('temp', temp);
      } catch {
        resolve(temp.length / 1024 - 10);
        clearInterval(timer);
        localStorage.clear();
      }
      temp += str;
    }, 0);
  });
};

const computedUse = () => {
  let cache = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      cache += localStorage.getItem(key).length;
    }
  }
  return (cache / 1024).toFixed(2);
};
