let fs =  require('fs'); 
let express = require('express');

const app = express();
const port = 6700;

app.get('/', (req, res) => {
    res.status(200).send('<h1> Testing </h1>')
})
app.post('/test', (req, res) => {
    res.status(200).send('<h1> Testing post check</h1>')
})
app.put('/test', (req, res) => {
    res.status(200).send('<h1> Testing put check</h1>')
})

app.listen(port, () => {
    console.log("server started at", port);
});