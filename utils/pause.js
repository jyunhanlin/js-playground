const pause = (ms) => {
  let time = new Date();
  while (new Date() - time <= ms);
};
