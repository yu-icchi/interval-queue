'use strict';

var IntervalQueue = require('../lib');
var queue = new IntervalQueue();
queue.on('data', function(data) {
  console.log(data);
});
queue.push('test001');
queue.push('test002');
queue.push('test003');
setTimeout(function() {
  queue.push('test101');
  queue.push('test102');
  queue.push('test103');
}, 1000);
setTimeout(function() {
  queue.push('test201');
  queue.push('test202');
  queue.push('test203');
}, 2000);
setTimeout(function() {
  queue.push('test301');
  queue.push('test302');
  queue.push('test303');
}, 3000);
setTimeout(function() {
  queue.push('test401');
  queue.push('test402');
  queue.push('test403');
}, 4000);
setTimeout(function() {
  queue.push('test501');
  queue.push('test502');
  queue.push('test503');
}, 5000);