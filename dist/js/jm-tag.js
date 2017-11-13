(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * tag module.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module tag
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EventEmitter = _jmEvent2.default.EventEmitter;
var enableEvent = _jmEvent2.default.enableEvent;
var disableEvent = _jmEvent2.default.disableEvent;

/**
 * Object with tag enabled
 */

var TagObject = function (_EventEmitter) {
  _inherits(TagObject, _EventEmitter);

  /**
     * create a tagObject
     */
  function TagObject() {
    _classCallCheck(this, TagObject);

    var _this = _possibleConstructorReturn(this, (TagObject.__proto__ || Object.getPrototypeOf(TagObject)).call(this));

    _this._tags = [];
    Object.defineProperty(_this, 'tags', {
      value: _this._tags,
      writable: false
    });
    return _this;
  }

  /**
     * destroy, remove all tags
     */


  _createClass(TagObject, [{
    key: 'destroy',
    value: function destroy() {
      this.emit('destroy', this);
      this.removeAllTags();
    }

    /**
       * check if has a tag
       * @param {String} tag
       * @return {boolean}
       */

  }, {
    key: 'hasTag',
    value: function hasTag(tag) {
      var tags = this._tags;
      return tags.indexOf(tag) != -1;
    }

    /**
       * check if has any one of tags
       * @param  {String[]} tags
       * @return {boolean}
       */

  }, {
    key: 'hasTagAny',
    value: function hasTagAny(tags) {
      for (var i in tags) {
        if (this.hasTag(tags[i])) return true;
      }
      return false;
    }

    /**
       * check if has any all of tags
       * @param {String[]} tags
       * @return {boolean}
       */

  }, {
    key: 'hasTagAll',
    value: function hasTagAll(tags) {
      for (var i in tags) {
        if (!this.hasTag(tags[i])) return false;
      }
      return true;
    }

    /**
       * add a tag
       * @param {String} tag
       * @return {TagObject}
       */

  }, {
    key: 'addTag',
    value: function addTag(tag) {
      var tags = this._tags;
      if (this.hasTag(tag)) return this;
      tags.push(tag);
      this.emit('addTag', tag);
      return this;
    }

    /**
       * add tags
       * @param {String[]} tags
       * @return {TagObject}
       */

  }, {
    key: 'addTags',
    value: function addTags(tags) {
      for (var i in tags) {
        this.addTag(tags[i]);
      }
      return this;
    }

    /**
       * remove a tag
       * @param {String} tag
       * @return {TagObject}
       */

  }, {
    key: 'removeTag',
    value: function removeTag(tag) {
      var tags = this._tags;
      var idx = tags.indexOf(tag);
      if (idx >= 0) {
        tags.splice(idx, 1);
      }
      this.emit('removeTag', tag);
      return this;
    }

    /**
       * remove tags
       * @param {String[]} tags
       * @return {TagObject}
       */

  }, {
    key: 'removeTags',
    value: function removeTags(tags) {
      for (var i in tags) {
        this.removeTag(tags[i]);
      }
      return this;
    }

    /**
       * remove all tags
       * @return {TagObject}
       */

  }, {
    key: 'removeAllTags',
    value: function removeAllTags() {
      var v = this._tags;
      for (var i in v) {
        this.emit('removeTag', v[i]);
      }
      this._tags = [];
      this.emit('removeAllTags');
      return this;
    }
  }]);

  return TagObject;
}(EventEmitter);

var prototype = TagObject.prototype;
var Tag = {
  _tags: [],
  hasTag: prototype.hasTag,
  hasTagAny: prototype.hasTagAny,
  hasTagAll: prototype.hasTagAll,
  addTag: prototype.addTag,
  addTags: prototype.addTags,
  removeTag: prototype.removeTag,
  removeTags: prototype.removeTags,
  removeAllTags: prototype.removeAllTags
};

var enableTag = function enableTag(obj) {
  if (obj._tags != undefined) return false;
  for (var key in Tag) {
    obj[key] = Tag[key];
  }
  obj._tags = [];
  Object.defineProperty(obj, 'tags', {
    value: obj._tags,
    writable: false
  });
  enableEvent(obj);
  return true;
};

var disableTag = function disableTag(obj) {
  for (var key in Tag) {
    delete obj[key];
  }
  disableEvent(obj);
};

var moduleTag = function moduleTag($) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tag';

  $.enableTag = enableTag;
  $.disableTag = disableTag;

  return {
    name: name,
    unuse: function unuse() {
      delete $.enableTag;
      delete $.disableTag;
    }
  };
};

var $ = {
  TagObject: TagObject,
  enableTag: enableTag,
  disableTag: disableTag,
  moduleTag: moduleTag
};

if (typeof global !== 'undefined' && global) {
  global.jm || (global.jm = {});
  var jm = global.jm;
  if (!jm.TagObject) {
    for (var key in $) {
      jm[key] = $[key];
    }
  }
}

exports.default = $;
module.exports = exports['default'];
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"jm-event":2}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * event module.
 * @module event
 */

/**
 * Class representing an eventEmitter.
 *
 * ```javascript
 * // es6
 * let eventEmitter = new EventEmitter();
 * eventEmitter.on('test', (info) => {
 *      console.log(info);
 * });
 * eventEmitter.once('test', (info) => {
 *      // this will be called only one time
 *      console.log(info);
 * });
 * eventEmitter.one('test', (info) => {
 *      // this will be called first
 *      console.log(info);
 * }, true);
 *
 * eventEmitter.emit('test', 'hello eventEmitter');
 * eventEmitter.off('test');
 * ```
 */
var EventEmitter = function () {
  /**
     * Create an eventEmitter.
     */
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     * No checks are made to see if the listener has already been added.
     * Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
     *
     * @param {*} eventName - event name
     * @param {Function} fn - listener function
     * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
     * @return {EventEmitter} - for chaining
     */


  _createClass(EventEmitter, [{
    key: 'on',
    value: function on(eventName, fn, prepend) {
      this._events[eventName] || (this._events[eventName] = []);
      if (prepend) {
        this._events[eventName].unshift(fn);
      } else {
        this._events[eventName].push(fn);
      }
      return this;
    }

    /**
       * Adds a one time listener function for the event named eventName.
       * The next time eventName is triggered, this listener is removed and then invoked.
       *
       * @param {*} eventName - event name
       * @param {Function} fn - listener function
       * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
       * @return {EventEmitter} - for chaining
       */

  }, {
    key: 'once',
    value: function once(eventName, fn, prepend) {
      var _this = this;

      var on = function on(arg1, arg2, arg3, arg4, arg5) {
        _this.off(eventName, on);
        fn(arg1, arg2, arg3, arg4, arg5);
      };
      return this.on(eventName, on, prepend);
    }

    /**
       * Removes a listener for the event named eventName.
       * Removes all listeners from the listener array for event named eventName if fn is null
       * Removes all listeners from the listener array if eventName is null
       *
       * @param {*} [eventName] - event name
       * @param {Function} [fn] - listener function
       * @return {EventEmitter} - for chaining
       */

  }, {
    key: 'off',
    value: function off(eventName, fn) {
      if (!fn) {
        if (eventName === undefined) {
          this._events = {};
        } else if (this._events && this._events[eventName]) {
          delete this._events[eventName];
        }
      } else if (this._events && this._events[eventName]) {
        var list = this._events[eventName];
        for (var i = 0; i < list.length; i++) {
          if (fn === list[i]) {
            list.splice(i, 1);
            if (!list.length) {
              delete this._events[eventName];
            }
            break;
          }
        }
      }
      return this;
    }

    /**
       * Synchronously calls each of the listeners registered for the event named eventName,
       * in the order they were registered, passing the supplied arguments to each.
       *
       * to break the calls, just return false on listener function.
       * ```javascript
       * // es6
       * let eventEmitter = new EventEmitter();
       * eventEmitter.on('test', (info) => {
       *      // this will be called
       *      console.log(info);
       * });
       * eventEmitter.on('test', (info) => {
       *      // this will be called
       *      return false;  // this break the calls
       * });
       * eventEmitter.on('test', (info) => {
       *      // this will not be called.
       *      console.log(info);
       * });
       * eventEmitter.emit('test', 'hello eventEmitter');
       * ```
       * tip: use arg1...arg5 instead of arguments for performance consider.
       *
       * @param {*} eventName - event name
       * @param {*} arg1
       * @param {*} arg2
       * @param {*} arg3
       * @param {*} arg4
       * @param {*} arg5
       * @return {EventEmitter} - for chaining
       */

  }, {
    key: 'emit',
    value: function emit(eventName, arg1, arg2, arg3, arg4, arg5) {
      // using a copy to avoid error when listener array changed
      var listeners = this.listeners(eventName);
      for (var i = 0; i < listeners.length; i++) {
        var fn = listeners[i];
        if (fn(arg1, arg2, arg3, arg4, arg5) === false) break;
      }
      return this;
    }

    /**
       * Returns an array listing the events for which the emitter has registered listeners.
       * The values in the array will be strings or Symbols.
       * @return {Array}
       */

  }, {
    key: 'eventNames',
    value: function eventNames() {
      return Object.keys(this._events);
    }

    /**
       * Returns a copy of the array of listeners for the event named eventName.
       * @param {*} eventName - event name
       * @return {Array} - listener array
       */

  }, {
    key: 'listeners',
    value: function listeners(eventName) {
      var v = this._events[eventName];
      if (!v) return [];
      var listeners = new Array(v.length);
      for (var i = 0; i < v.length; i++) {
        listeners[i] = v[i];
      }
      return listeners;
    }
  }]);

  return EventEmitter;
}();

var prototype = EventEmitter.prototype;
var EM = {
  _events: {},
  on: prototype.on,
  once: prototype.once,
  off: prototype.off,
  emit: prototype.emit,
  eventNames: prototype.eventNames,
  listeners: prototype.listeners
};

var enableEvent = function enableEvent(obj) {
  if (obj.emit !== undefined) return false;
  for (var key in EM) {
    obj[key] = EM[key];
  }
  obj._events = {};
  return true;
};

var disableEvent = function disableEvent(obj) {
  if (obj.emit === undefined) return;
  for (var key in EM) {
    delete obj[key];
  }
};

var moduleEvent = function moduleEvent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'event';

  var obj = this;
  obj.enableEvent = enableEvent;
  obj.disableEvent = disableEvent;

  return {
    name: name,
    unuse: function unuse() {
      delete obj.enableEvent;
      delete obj.disableEvent;
    }
  };
};

var $ = {
  EventEmitter: EventEmitter,
  enableEvent: enableEvent,
  disableEvent: disableEvent,
  moduleEvent: moduleEvent
};

if (typeof global !== 'undefined' && global) {
  global.jm || (global.jm = {});
  var jm = global.jm;
  if (!jm.EventEmitter) {
    for (var key in $) {
      jm[key] = $[key];
    }
  }
}

exports.default = $;
module.exports = exports['default'];
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])