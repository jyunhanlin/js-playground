function ellipsis(container, textNode) {
  const str = primitiveText;
  textNode.textContent = str;
  container.style.whiteSpace = 'nowrap';
  container.style.width = 'fit-content';
  const containerWidth = container.clientWidth;

  const parent = container.parentElement;
  const parentWidth = parent.clientWidth || parent.offsetWidth;
  if (containerWidth <= parentWidth) {
    textNode.textContent = str;
    return;
  } else if (cssEntirely.value) {
    container.style.width = parentWidth + 'px';
    container.style.whiteSpace = 'nowrap';
    container.style.textOverflow = 'ellipsis';
    container.style.overflow = 'hidden';
    return;
  } else {
    const textWidth = textNode.offsetWidth;
    const strNumber = str.length;
    const avgStrWidth = textWidth / strNumber;
    const canFitStrNumber = Math.floor((parentWidth * props.startEllipsisLine) / avgStrWidth);

    const shouldDelNumber = strNumber - canFitStrNumber + 1.5;
    const delEachSide = shouldDelNumber / 2;
    const endLeft = Math.floor(strNumber / 2 - delEachSide);
    const startRight = Math.ceil(strNumber / 2 + delEachSide);

    switch (props.suffix) {
      case true: {
        textNode.textContent = str.slice(0, endLeft) + '...' + str.slice(startRight);
        break;
      }
      case false: {
        textNode.textContent = str.slice(0, -shouldDelNumber) + '...';

        break;
      }
    }
    container.style.wordBreak = 'break-all';
    container.style.whiteSpace = 'normal';
  }
}
