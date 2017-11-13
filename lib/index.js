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