function shuffle(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let randomIndex = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
}

function shuffle2(arr) {
  let _arr = [];

  while (arr.length) {
    let randomIndex = i + Math.floor(Math.random() * arr.length);
    _arr.push(arr.splice(randomIndex, 1)[0]);
  }
}
