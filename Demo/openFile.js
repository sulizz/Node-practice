const fs = require('fs');
var buffer = new Buffer.alloc(1024);

console.log("open existing file");

fs.open('abc.txt','r+', function(err,fd) {
    if(err) {
        console.log(err)
    }
    
    console.log('reading the file');

    fs.read(fd, buffer, 0,buffer.lenth, 0, function(err,bytes){

        if(err) {
            console.log(err)
        }

        if (bytes>0) {
            console.log(buffer.slice(0,bytes).toString())
        }

        console.log(bytes + 'bytes read')

        fs.close(fd,function(err){
            if(err) {
                console.log(err)
            }
            console.log('File closed successfully')
        })
    })
    
})