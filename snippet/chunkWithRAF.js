const taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);
function processTaskList(taskStartTime) {
  let taskFinishTime;
  do {
    const nextTask = taskList.pop();
    processTask(nextTask);
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);
  if (taskList.length > 0) {
    requestAnimationFrame(processTaskList);
  }
}
