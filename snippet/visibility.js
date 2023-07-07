const browserPrefixes = ['moz', 'ms', 'o', 'webkit'];

// get the correct attribute name
function getHiddenPropertyName(prefix) {
  return prefix ? prefix + 'Hidden' : 'hidden';
}

// get the correct event name
function getVisibilityEvent(prefix) {
  return (prefix ? prefix : '') + 'visibilitychange';
}

// get current browser vendor prefix
function getBrowserPrefix() {
  for (let i = 0; i < browserPrefixes.length; i += 1) {
    if (getHiddenPropertyName(browserPrefixes[i]) in document) {
      // return vendor prefix
      return browserPrefixes[i];
    }
  }

  // no vendor prefix needed
  return null;
}

class Visibility {
  constructor({ onVisibleListener, onHiddenListener } = {}) {
    this.isVisible = true;
    const browserPrefix = getBrowserPrefix();
    this.hiddenPropertyName = getHiddenPropertyName(browserPrefix);
    this.visibilityEventName = getVisibilityEvent(browserPrefix);
    this.onVisibleListeners = [];
    this.onHiddenListeners = [];
    if (onVisibleListener || onHiddenListener) {
      onVisibleListener && this.onVisibleListeners.push(onVisibleListener);
      onHiddenListener && this.onHiddenListeners.push(onHiddenListener);
      this.bindListener();
    }
  }

  addVisibleListener(listener) {
    this.onVisibleListeners.push(listener);
  }

  removeVisibleListener(listener) {
    this.onVisibleListeners = this.onVisibleListeners.filter(
      (curListener) => curListener !== listener
    );
  }

  addHiddenListener(listener) {
    this.onHiddenListeners.push(listener);
  }

  removeHiddenListener(listener) {
    this.onHiddenListeners = this.onHiddenListeners.filter(
      (curListener) => curListener !== listener
    );
  }

  onVisible() {
    if (this.isVisible) return;

    this.isVisible = true;
    this.onVisibleListeners.forEach((listener) => listener());
  }

  onHidden() {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.onHiddenListeners.forEach((listener) => listener());
  }

  handleVisibilityChange = (forcedFlag) => {
    if (typeof forcedFlag === 'boolean') {
      if (forcedFlag) {
        return this.onVisible();
      }

      return this.onHidden();
    }

    if (document[hiddenPropertyName]) {
      return this.onHidden();
    }

    return this.onVisible();
  };

  handleFocus = () => {
    this.handleVisibilityChange(true);
  };

  handleBlur = () => {
    this.handleVisibilityChange(false);
  };

  bindListener() {
    document.addEventListener(this.visibilityEventName, this.handleVisibilityChange, false);
    document.addEventListener('focus', this.handleFocus, false);
    document.addEventListener('blur', this.handleBlur, false);
    window.addEventListener('focus', this.handleFocus, false);
    window.addEventListener('blur', this.handleBlur, false);
  }

  unbindListeners() {
    document.removeEventListener(this.visibilityEventName, this.handleVisibilityChange);
    document.removeEventListener('focus', this.handleFocus);
    document.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('focus', this.handleFocus);
    window.removeEventListener('blur', this.handleBlur);
  }
}
