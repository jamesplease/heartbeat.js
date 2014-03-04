/*
 *
 * heartbeat.js
 * Perform a function on an interval
 *
 */

(function() {

  window.Heartbeat = function( options ) {

    options = options || {};

    this.fn = options.fn || function() {};
    this.context = options.context || window;
    this.interval = options.interval || 1000;
    this.trailing = options.trailing || false;
    this.leading = options.leading || false;

    // Initial data
    this._alive = false;
    this._periodCalls = 0;
    this._totalCalls = 0;
    this._stopCount = 0;
    this._startCount = 0;

    if ( options.autostart ) {
      this.start();
    }
  
  };

  window.Heartbeat.prototype.start = function() {

    if ( this._alive ) {
      return;
    }
    if ( this.leading ) {
      this._executeFn();
    }

    this._alive = true;
    this._beat();
    this._startCount++;

  };

  window.Heartbeat.prototype.stop = function() {

    if ( !this._alive ) {
      return;
    }

    this._alive = false;
    this._periodCalls = 0;
    this._stopCount++;
  };

  window.Heartbeat.prototype.alive = function() {
    return this._alive;
  };

  window.Heartbeat.prototype.periodCalls = function() {
    return this._periodCalls;
  };

  window.Heartbeat.prototype.totalCalls = function() {
    return this._totalCalls;
  };

  window.Heartbeat.prototype.startCount = function() {
    return this._startCount;
  };

  window.Heartbeat.prototype.stopCount = function() {
    return this._stopCount;
  };

  window.Heartbeat.prototype.setFn = function( fn ) {
    this.fn = fn;
  };

  window.Heartbeat.prototype.setInterval = function( interval ) {
    this.interval = interval;
  };

  window.Heartbeat.prototype.setContext = function( context ) {
    this.context = context;
  };

  // Attempt to execute the user-defined function;
  // wrapped in a try-catch to handle any errors.
  window.Heartbeat.prototype._executeFn = function() {

    try {
     this._bind( this.fn, this.context )();
    } catch( e ) {
      // Woops!
    }

  };

  // Underscore's bind method
  window.Heartbeat.prototype._bind = function( func, context ) {
    var nativeBind = Function.prototype.bind;
    var slice = Array.prototype.slice;
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (typeof func !== 'function') throw new TypeError();
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor();
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  window.Heartbeat.prototype._beat = function() {

    var self = this;

    setTimeout(function(){

      if ( !self._alive && !self.trailing ) {
        return;
      }

      if ( self.fn && typeof self.fn === 'function' ) {
        self._executeFn();
        self._totalCalls++;
        self._periodCalls++;
      }

      // Only repeat if still alive ( for the trailing option )
      if ( self._alive ) {
        self._bind( self._beat, self )();
      }

    }, self.interval);

  };

})();