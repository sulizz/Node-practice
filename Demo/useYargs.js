// npm i yargs  --save

var yargs = require('yargs')
const fs = require('fs');

console.log(yargs.argv)

// output 
// node useYargs.js 
// { _: [], '$0': 'useYargs.js' }

// node useYargs.js 9 7 ga --filename="abc.txt"
// { _: [ 9, 7, 'ga' ], filename: 'abc.txt', '$0': 'useYargs.js' }

console.log(yargs.argv._)
console.log(yargs.argv.$0)
console.log(yargs.argv.filename)

// node useYargs.js 9 7 ga --filename="abc.txt"
// [ 9, 7, 'ga' ]
// useYargs.js
// abc.txt

//reading a file
fs.readFile('abc.txt', function(err, data) {
    if(err) {
        console.error('error in reading the file')
    } else if (data) {
        console.log(data.toString())
    }
})

