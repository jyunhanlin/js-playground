const p = document.querySelector('p');
const div = document.querySelector('div');

function updateDOM(lastScrollY) {
  const divHeight = div.getBoundingClientRect().height;
  const viewportHeight = window.innerHeight;
  const scrollFraction = lastScrollY / (divHeight - viewportHeight);

  p.style.opacity = 1 - scrollFraction;
}

function rAFThrottle(callback) {
  let requestID;

  return function (...args) {
    const context = this;

    cancelAnimationFrame(requestID);

    requestID = requestAnimationFrame(() => {
      callback.call(context, ...args);
      isWait = false;
    });
  };
}

const throttledUpdateDOM = rAFThrottle(updateDOM);

function onScroll() {
  throttledUpdateDOM(window.scrollY);
}

window.addEventListener('scroll', onScroll);
