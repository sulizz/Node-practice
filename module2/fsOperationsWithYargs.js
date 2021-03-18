/*
1: Fs Operations With Yargs
Create an application with following features:
1) You need to write in file using fs module and for every write operation you need to create a new file
2) You must take input from the user as filename and keep saving filenames in one array, in one
separate text file
3) Next time when user again executes the code ask user to provide filename. Check if file
already exists, if yes then ask user to give new filename. Write simple text ‘You are awesome’ in every
new file
*/

const fs = require('fs');
const yargs = require('yargs');

// step1 -- take the filename from command line
// step2 -- get array from one filenames.txt file
// step3 -- save the array and check whether the filename exists in that array or not 
//          if yes 
//              throw error
//          else 
//              add the filename to that array and save it 
//              create this new file and write you are awesome 

//filename
let filename = yargs.argv.filename
let fileArr = [];

console.log('filename:', filename);

fs.readFile('filenames.txt', (err, data) =>{
    if(err) {
        return console.error(err);
    } else {
        fileArr = JSON.parse(data);

        console.log("file exists: ", fileArr.includes(filename))

        if (fileArr.includes(filename)) {
            return console.error("ERROR: Cannot create the file -- file exists");
        } else {
            fileArr.push(filename);
            console.log('Sucess: file has been added to the Array')
            console.log('fileArray',fileArr);

            fs.writeFile("filenames.txt", JSON.stringify(fileArr), (err) => {
                if(err) {
                    return console.error(err);
                }
            })

            fs.writeFile(filename,"You are awsome", (err) => {
                if(err) {
                    throw err;
                } else {
                    console.log("Sucess: data has been written in file", filename)
                }
            })
        }

    }
})