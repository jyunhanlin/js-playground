const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = processTaskList;
const chunkTaskList = () => port.postMessage(null);

const taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
function processTaskList() {
  const taskStartTime = window.performance.now();
  let taskFinishTime;
  do {
    const nextTask = taskList.pop();
    processTask(nextTask);
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);
  if (taskList.length > 0) {
    chunkTaskList();
  }
}
