let evtName = getEventName();

let offsetX = 0,
  offsetY = 0;

let limitX = 0,
  limitY = 0;

window.onload = () => {
  const bird = document.querySelector('.bird');
  const { width, height } = bird;

  limitX = document.documentElement.clientWidth - width;
  limitY = document.documentElement.clientHeight - height;

  bird.addEventListener(evtName.start, (event) => {
    document.addEventListener(evtName.move, moveAt);
  });

  document.addEventListener(evtName.end, () => {
    document.removeEventListener(evtName.move, moveAt);
  });

  function moveAt({ movementX, movementY }) {
    const { offsetX, offsetY } = getSafeOffset({ movementX, movementY });

    window.requestAnimationFrame(() => {
      bird.style.cssText = `left:${offsetX}px;top:${offsetY}px;`;
    });
  }
};

function getEventName() {
  if ('ontouchstart' in window) {
    return {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
    };
  } else {
    return {
      start: 'pointerdown',
      move: 'pointermove',
      end: 'pointerup',
    };
  }
}

const getSafeOffset = ({ movementX, movementY }) => {
  offsetX += movementX;
  offsetY += movementY;

  if (offsetX > limitX) {
    offsetX = limitX;
  }

  if (offsetX < 0) {
    offsetX = 0;
  }

  if (offsetY > limitY) {
    offsetY = limitY;
  }

  if (offsetY < 0) {
    offsetY = 0;
  }

  return { offsetX, offsetY };
};
