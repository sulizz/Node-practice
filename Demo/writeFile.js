const fs = require('fs');

fs.writeFile('abc.txt', 'This is inside of write file', function(err){
    if (err) {
        console.log(err)
    }
})