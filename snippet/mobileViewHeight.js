// in css
// .my-element {
//   height: 100vh; /* Fallback for browsers that do not support Custom Properties */
//   height: calc(var(--vh, 1vh) * 100);
// }

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
