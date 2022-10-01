function yieldToMain() {
  if (scheduler?.yield) return scheduler.yield();

  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

async function saveSettings() {
  // A task queue of functions
  const tasks = [validateForm, showSpinner, saveToDatabase, updateUI, sendAnalytics];

  let deadline = performance.now() + 50;

  while (tasks.length > 0) {
    // Optional chaining operator used here helps to avoid
    // errors in browsers that don't support `isInputPending`:
    if (navigator.scheduling?.isInputPending() || performance.now() >= deadline) {
      // There's a pending user input, or the
      // deadline has been reached. Yield here:
      await yieldToMain();

      // Extend the deadline:
      deadline += 50;

      // Stop the execution of the current loop and
      // move onto the next iteration:
      continue;
    }

    // Shift the the task out of the queue:
    const task = tasks.shift();

    // Run the task:
    task();
  }

  // // Validate the form at high priority
  // scheduler.postTask(validateForm, {priority: 'user-blocking'});

  // // Show the spinner at high priority:
  // scheduler.postTask(showSpinner, {priority: 'user-blocking'});

  // // Update the database in the background:
  // scheduler.postTask(saveToDatabase, {priority: 'background'});

  // // Update the user interface at high priority:
  // scheduler.postTask(updateUI, {priority: 'user-blocking'});

  // // Send analytics data in the background:
  // scheduler.postTask(sendAnalytics, {priority: 'background'});
}
