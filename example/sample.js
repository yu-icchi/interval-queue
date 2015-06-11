'use strict';

var IntervalQueue = require('../lib');
var queue = new IntervalQueue({size: 10, interval: 3000});
queue.on('data', function(data) {
  console.log('data', data, queue.length);
});
for (var i = 0; i < 30; i++) {
  queue.push('test' + i);
}
setTimeout(function() {
  setImmediate(function() {
    for (var i = 0; i < 30; i++) {
      queue.push('test1' + i);
    }
  });
}, 3000);
