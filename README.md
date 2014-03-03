# heartbeat.js

Perform a function on an interval.

## Getting Started

Get the source by direct download, by cloning this repository, or through [Bower](http://bower.io/).

`bower install heartbeats.js`

## Usage

Use heartbeat by creating a new instance of it.

```js
var heartbeat = new Heartbeat({
  // Configure your options here
});
```

## Options

You can pass options to modify the behavior of Heartbeats.

### fn
Type: `function`  
Default: `function() {}`

The function to be executed on an interval.

### context
Type: `object`  
Default: `window`

The value of `this` within the function.

### interval
Type: `number`  
Default: `1000`

The frequency of executing the function in milliseconds.

### autostart
Type: `boolean`  
Default: `false`

Whether to start upon instantiation or not.

### trailing
Type: `boolean`  
Default: `false`

When a heartbeat is stopped the function will immediately stop being called. Pass `true` for this option to execute the function a final time *after* the heartbeat has stopped.

### leading
Type: `boolean`  
Default: `false`

Heartbeats will not execute the function when it is started until an initial interval passes. Pass `true` for this option to fire the function immediately on start up.

## Heartbeat.prototype

These methods comprise the API for working with a heartbeat.

##### `start()`

Start the heartbeat.

##### `stop()`

Stop the heartbeat.

##### `alive()`

A boolean that represents whether the heartbeat is started or stopped.

##### `setFn( fn )`

Set a new function to be executed.

##### `setInterval( interval )`

Specify a new interval. Takes effect the next time the function is called.

##### `setContext( context )`

Change the context of the function being called.

##### `periodCalls()`

The number of times the function has been called since the last `stop`.

##### `totalCalls()`

The total number of times the heartbeat has called the function.

##### `startCount()`

The number of times the heartbeat has been started.

##### `stopCount()`

The number of times the heartbeat has been stopped.