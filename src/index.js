/**
 * tag module.
 * @module tag
 */

import event from 'jm-event'
let EventEmitter = event.EventEmitter
let enableEvent = event.enableEvent
let disableEvent = event.disableEvent

/**
 * Object with tag enabled
 */
class TagObject extends EventEmitter {
  /**
     * create a tagObject
     */
  constructor () {
    super()
    this._tags = []
    Object.defineProperty(this, 'tags', {
      value: this._tags,
      writable: false
    })
  }

  /**
     * destroy, remove all tags
     */
  destroy () {
    this.emit('destroy', this)
    this.removeAllTags()
  }

  /**
     * check if has a tag
     * @param {String} tag
     * @return {boolean}
     */
  hasTag (tag) {
    let tags = this._tags
    return tags.indexOf(tag) != -1
  }

  /**
     * check if has any one of tags
     * @param  {String[]} tags
     * @return {boolean}
     */
  hasTagAny (tags) {
    for (let i in tags) {
      if (this.hasTag(tags[i])) return true
    }
    return false
  }

  /**
     * check if has any all of tags
     * @param {String[]} tags
     * @return {boolean}
     */
  hasTagAll (tags) {
    for (let i in tags) {
      if (!this.hasTag(tags[i])) return false
    }
    return true
  }

  /**
     * add a tag
     * @param {String} tag
     * @return {TagObject}
     */
  addTag (tag) {
    let tags = this._tags
    if (this.hasTag(tag)) return this
    tags.push(tag)
    this.emit('addTag', tag)
    return this
  }

  /**
     * add tags
     * @param {String[]} tags
     * @return {TagObject}
     */
  addTags (tags) {
    for (let i in tags) {
      this.addTag(tags[i])
    }
    return this
  }

  /**
     * remove a tag
     * @param {String} tag
     * @return {TagObject}
     */
  removeTag (tag) {
    let tags = this._tags
    let idx = tags.indexOf(tag)
    if (idx >= 0) {
      tags.splice(idx, 1)
    }
    this.emit('removeTag', tag)
    return this
  }

  /**
     * remove tags
     * @param {String[]} tags
     * @return {TagObject}
     */
  removeTags (tags) {
    for (let i in tags) {
      this.removeTag(tags[i])
    }
    return this
  }

  /**
     * remove all tags
     * @return {TagObject}
     */
  removeAllTags () {
    let v = this._tags
    for (let i in v) {
      this.emit('removeTag', v[i])
    }
    this._tags = []
    this.emit('removeAllTags')
    return this
  }
}

let prototype = TagObject.prototype
let Tag = {
  _tags: [],
  hasTag: prototype.hasTag,
  hasTagAny: prototype.hasTagAny,
  hasTagAll: prototype.hasTagAll,
  addTag: prototype.addTag,
  addTags: prototype.addTags,
  removeTag: prototype.removeTag,
  removeTags: prototype.removeTags,
  removeAllTags: prototype.removeAllTags
}

let enableTag = (obj) => {
  if (obj._tags != undefined) return false
  for (let key in Tag) {
    obj[key] = Tag[key]
  }
  obj._tags = []
  Object.defineProperty(obj, 'tags', {
    value: obj._tags,
    writable: false
  })
  enableEvent(obj)
  return true
}

let disableTag = (obj) => {
  for (let key in Tag) {
    delete obj[key]
  }
  disableEvent(obj)
}

let moduleTag = ($, name = 'tag') => {
  $.enableTag = enableTag
  $.disableTag = disableTag

  return {
    name: name,
    unuse () {
      delete $.enableTag
      delete $.disableTag
    }
  }
}

let $ = {
  TagObject: TagObject,
  enableTag: enableTag,
  disableTag: disableTag,
  moduleTag: moduleTag
}

if (typeof global !== 'undefined' && global) {
  global.jm || (global.jm = {})
  let jm = global.jm
  if (!jm.TagObject) {
    for (let key in $) jm[key] = $[key]
  }
}

export default $
