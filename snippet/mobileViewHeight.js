/**
 * Mobile View Height Fix
 *
 * Problem: On mobile browsers (especially iOS Safari), 100vh doesn't adjust when
 * the address bar shows/hides, causing content to be cut off or scrollable.
 *
 * Solution 1 (CSS only - Recommended):
 * Use browser-specific properties that automatically handle viewport changes.
 */

// CSS Solution (no JavaScript needed):
/*
body {
  height: 100%;
  height: -moz-available;          // Firefox
  height: -webkit-fill-available;  // Chrome, Safari
  height: fill-available;          // Standard
}
*/

/**
 * Solution 2 (JavaScript + CSS):
 * Dynamically update CSS custom property on resize.
 */

// CSS:
/*
:root {
  --app-height: 100vh;
}

.my-element {
  height: 100vh;  // Fallback
  height: var(--app-height);
}
*/

// JavaScript:
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
});

// Initial set on load
document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
