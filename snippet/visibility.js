class Visibility {
  constructor({ visibleListener, hiddenListener } = {}) {
    this.isVisible = !document.hidden;
    this.visibleListeners = new Set();
    this.hiddenListeners = new Set();
    if (visibleListener) this.visibleListeners.add(visibleListener);
    if (hiddenListener) this.hiddenListeners.add(hiddenListener);
    this.bindListeners();
  }

  addVisibleListener(listener) {
    this.visibleListeners.add(listener);
  }

  removeVisibleListener(listener) {
    this.visibleListeners.delete(listener);
  }

  addHiddenListener(listener) {
    this.hiddenListeners.add(listener);
  }

  removeHiddenListener(listener) {
    this.hiddenListeners.delete(listener);
  }

  onVisible() {
    if (this.isVisible) return;

    this.isVisible = true;
    this.visibleListeners.forEach((listener) => listener());
  }

  onHidden() {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.hiddenListeners.forEach((listener) => listener());
  }

  handleVisibilityChange = (forcedFlag) => {
    if (typeof forcedFlag === 'boolean') {
      if (forcedFlag) return this.onVisible();
      return this.onHidden();
    }

    if (document.hidden) return this.onHidden();
    return this.onVisible();
  };

  handleFocus = () => {
    this.handleVisibilityChange(true);
  };

  handleBlur = () => {
    this.handleVisibilityChange(false);
  };

  bindListeners() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
    document.addEventListener('focus', this.handleFocus, false);
    document.addEventListener('blur', this.handleBlur, false);
    window.addEventListener('focus', this.handleFocus, false);
    window.addEventListener('blur', this.handleBlur, false);
  }

  unbindListeners() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('focus', this.handleFocus);
    document.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('focus', this.handleFocus);
    window.removeEventListener('blur', this.handleBlur);
  }
}
