'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function IntervalQueue(options) {
  EventEmitter.call(this);

  options = options || {};

  this.interval = options.interval || 3 * 1000;
  this.size = options.size || 100;
  this.queue = [];
  this.timeoutId = null;
}
util.inherits(IntervalQueue, EventEmitter);

Object.defineProperty(IntervalQueue.prototype, 'length', {
  get: function() {
    return this.queue.length;
  }
});

IntervalQueue.prototype._event = function() {
  var self = this;
  var data = this.queue.splice(0, this.size);
  this.timeoutId = null;
  setImmediate(function() {
    self.emit('data', data);
    if (self.queue.length > 0) {
      self.timeoutId = setTimeout(self._event.bind(self), self.interval);
    }
  });
};

IntervalQueue.prototype.push = function(data) {
  this.queue.push(data);
  if (this.queue.length === 1 && this.timeoutId === null) {
    this.timeoutId = setTimeout(this._event.bind(this), this.interval);
  }
};

IntervalQueue.prototype.unshift = function(data) {
  this.queue.unshift(data);
  if (this.queue.length === 1 && this.timeoutId === null) {
    this.timeoutId = setTimeout(this._event.bind(this), this.interval);
  }
};

IntervalQueue.prototype.pause = function() {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
  }
};

IntervalQueue.prototype.resume = function() {
  if (Array.isArray(this.queue) && this.queue.length > 0) {
    this.timeoutId = setTimeout(this._event.bind(this), this.interval);
  }
};

IntervalQueue.prototype.kill = function() {
  this.pause();
  this.timeoutId = null;
};

IntervalQueue.prototype.setInterval = function(time) {
  this.interval = time;
};

module.exports = IntervalQueue;
