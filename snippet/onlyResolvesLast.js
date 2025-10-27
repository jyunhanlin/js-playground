/**
 * Ensures only the last invocation's result resolves/rejects.
 * Earlier calls are silently ignored even if they complete later.
 *
 * Use case: Prevent race conditions in rapid async operations (search, autocomplete, tab switching)
 */
function onlyResolvesLast(fn) {
  let latestCallId = 0;

  return function wrappedFn(...args) {
    // Increment and capture current call ID
    const currentCallId = ++latestCallId;

    // Execute the original function
    const result = fn.apply(this, args);

    // Only resolve/reject if this is still the latest call
    return new Promise((resolve, reject) => {
      Promise.resolve(result).then(
        (value) => {
          if (currentCallId === latestCallId) {
            resolve(value);
          }
          // Otherwise silently ignore outdated result
        },
        (error) => {
          if (currentCallId === latestCallId) {
            reject(error);
          }
          // Otherwise silently ignore outdated error
        }
      );
    });
  };
}

/* ============================================
 * Example: Search with random response delays
 * ============================================ */

const mockSearchAPI = (query) => {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Results for: ${query}`), delay);
  });
};

const search = onlyResolvesLast(mockSearchAPI);

// Simulate rapid typing: "a" -> "ab" -> "abc"
search('a').then(console.log); // Ignored (outdated)
search('ab').then(console.log); // Ignored (outdated)
search('abc').then(console.log); // ✓ Logs: "Results for: abc"

// Even if 'a' returns last due to random delay, it won't log
