// implement with setTimeout
function calcFPS() {
  let tasks = [Date.now()];
  let startTime = Date.now();

  const loop = () => {
    setTimeout(() => {
      const current = Date.now();
      tasks.push(current);
      tasks = tasks.filter((time) => current - time <= 1000);
      const time = tasks[tasks.length - 1] - tasks[0];

      if (current - startTime > 1000) {
        console.log('fps:', time ? parseInt((tasks.length / time) * 1000) : 0);
        startTime = Date.now();
      }
      loop();
    });
  };
  loop();
}

// implement with requestAnimationFrame
function calcFPS() {
  let tasks = [Date.now()];
  let startTime = Date.now();

  const loop = () => {
    requestAnimationFrame(() => {
      const current = Date.now();
      tasks.push(current);
      const tail = tasks.length - 1;
      if (tasks.length > 1 && tasks[tail] - tasks[tail - 1] > 1000) {
        console.log('lag:', tasks[tail] - tasks[tail - 1]);
      }

      tasks = tasks.filter((time) => current - time <= 1000);
      const time = tasks[tasks.length - 1] - tasks[0];

      if (current - startTime > 1000) {
        console.log('fps:', time ? parseInt((tasks.length / time) * 1000) : 0);
        startTime = Date.now();
      }

      loop();
    });
  };
  loop();
}
