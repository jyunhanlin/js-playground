# The event loop of async await

### The return value of async function

- non thenable, non promise
  - no need to wait
- thenable
  - wait for one event loop
- promise
  - wait for two event loop

### The value type after await

- non thenable, non promise
  - no need to wait
- thenable
  - wait for one event loop
- promise
  - wait for one event loop
  - wait for two event loop (before node.js v11)
