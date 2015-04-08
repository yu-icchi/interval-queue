'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function IntervalQueue(interval) {
  EventEmitter.call(this);

  this.interval = interval || 3 * 1000;
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
  var data = this.queue;
  this.queue = [];
  this.timeoutId = null;
  this.emit('data', data);
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
