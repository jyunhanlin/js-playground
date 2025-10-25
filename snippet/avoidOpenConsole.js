class DevToolsDetector {
  #callbacks = [];
  #timeLimit = 200; // 增加到 200ms 減少誤判
  #checkInterval = 500; // 從 1ms 改為 500ms，降低效能影響
  #detectionThreshold = 3; // 需要連續偵測 3 次才觸發
  #open = false;
  #detectionCount = 0;
  #timerId = null;

  constructor(autoStart = true) {
    if (autoStart) {
      this.start();
    }
  }

  #check = () => {
    const startTime = Date.now();
    debugger;
    const elapsed = Date.now() - startTime;

    if (elapsed > this.#timeLimit) {
      this.#detectionCount++;

      // 連續偵測達到閾值才確認開啟
      if (this.#detectionCount >= this.#detectionThreshold && !this.#open) {
        this.#open = true;
        this.#callbacks.forEach((fn) => fn());
      }
    } else {
      this.#detectionCount = 0;
      this.#open = false;
    }
  };

  start() {
    if (!this.#timerId) {
      this.#timerId = setInterval(this.#check, this.#checkInterval);
    }
    return this;
  }

  stop() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
    return this;
  }

  addListener(fn) {
    this.#callbacks.push(fn);
    return this;
  }

  cancelListener(fn) {
    this.#callbacks = this.#callbacks.filter((v) => v !== fn);
    return this;
  }

  isOpen() {
    return this.#open;
  }

  destroy() {
    this.stop();
    this.#callbacks = [];
  }
}

// 使用範例：友善的警告而非強制重新載入
const devToolsDetector = new DevToolsDetector();

devToolsDetector.addListener(() => {
  console.warn('⚠️ DevTools detected. Some features may be disabled.');
  // 可選：顯示頁面內提示而非 alert
  // showInPageWarning();
  // 可選：需要時才重新載入
  // window.location.reload();
});

// 也可以這樣用（鏈式呼叫）：
// const detector = new DevToolsDetector(false)
//   .addListener(() => console.log('Listener 1'))
//   .addListener(() => console.log('Listener 2'))
//   .start();

// 停止偵測：detector.stop();
// 重新開始：detector.start();
// 完全銷毀：detector.destroy();
