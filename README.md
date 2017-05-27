# jm-tag
tagged object

```javascript
// nodejs
const tag = require('jm-tag');

var o = {};
tag.enableTag(o);

o.addTag('123');
console.info('tags ' + JSON.stringify(o.tags));
o.removeTag('123');
console.info('tags ' + JSON.stringify(o.tags));

```
