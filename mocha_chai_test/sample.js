var arr = [1,2,3,4,5];

let assert = require('chai').assert;

assert.isArray(arr, 'is array of numbers');
assert.lengthOf(arr,5, 'has 5 elements')