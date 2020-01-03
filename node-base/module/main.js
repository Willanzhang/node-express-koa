const foo = require('./foo.js');
const m = require('./foom.mjs');
const cc = require('./some-library');

const p = require.resolve.paths('./some-library');
console.log('path----------', foo);
console.log('path----------', require('module').builtinModules);
// console.log('main.js============', m);