/**
 * http://usejsdoc.org/
 */
// myEE.eventNames() returns the eventNames associated with the event handler
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('fooEvent', () => {console.log('foo occurred!');});
myEE.on('bar', () => {console.log('bar occurred!');});

var sym = Symbol('symbol');
myEE.on(sym, () => {console.log('symbol occurred!');});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]



myEE.emit('fooEvent');