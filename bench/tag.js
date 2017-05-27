'use strict';

const benchmark = require('benchmark');
const crypto = require('crypto');
const tag = require('../lib');

var o = {};
tag.enableTag(o);

const suite = new benchmark.Suite();

suite
    .add('addTag', () => {
        o.addTag('123');
        o.removeTag('123');
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
;

if (require.main === module) {
    suite.run({async: true});
} else {
    module.exports = suite;
}
