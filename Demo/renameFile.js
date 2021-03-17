const fs = require('fs');

fs.rename('abc.txt','renamed.txt', function(err, data){
    if(err) {
        console.log(err) 
    } else {
        console.log('Renamed')
    }
})