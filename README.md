# interval-queue

## Installation
```bash
npm install interval-queue
```

## Example
```javascript
var IntervalQueue = require('interval-queue');
var queue = new IntervalQueue(5 * 1000);
queue.on('data', function(chunks) {
  console.log(chunks); // -> [{msg: 'sample', time: 1428339082787}, {msg: 'example', time: 1428339111659}]
});
queue.push({msg: 'sample', time: 1428339082787});
queue.push({msg: 'example', time: 1428339111659});
```

## APIs

### Class:IntervalQueue

#### IntervalQueue#push(data)

#### IntervalQueue#unshift(data)

#### IntervalQueue#length

#### IntervalQueue#pause()

#### IntervalQueue#resume()

#### IntervalQueue#kill()

#### IntervalQueue#setInterval(time)

### Events

#### Event: 'data'
