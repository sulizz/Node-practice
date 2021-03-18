new Promise( (resolve, reject)=>{
    //perform a  task

    const a ="node";
    const b = "node";

    if (a===b){
        resolve()
    }
    else{
        reject()
    }
}).then(()=>{
    console.log('sucess')
}).catch(()=>{
    console.log('error')
})
