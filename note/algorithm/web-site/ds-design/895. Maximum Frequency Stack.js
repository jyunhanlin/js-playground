var FreqStack = function () {
  this.maxFreq = 0;
  this.valToFreq = new Map();
  this.freqToVals = new Map();
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  const freq = (this.valToFreq.get(val) || 0) + 1;
  this.valToFreq.set(val, freq);

  if (!this.freqToVals.has(freq)) {
    this.freqToVals.set(freq, []);
  }

  this.freqToVals.get(freq).push(val);

  this.maxFreq = Math.max(this.maxFreq, freq);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const vals = this.freqToVals.get(this.maxFreq);
  const val = vals.pop();

  if (vals.length === 0) this.maxFreq -= 1;

  const freq = this.valToFreq.get(val) - 1;
  this.valToFreq.set(val, freq);

  return val;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
