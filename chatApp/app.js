import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io'

const app = express();
app.use(express.static(path.join(__dirname,'public')))


app.set('port',process.env.PORT || 3500)
http.createServer(app).listen(app.get('port'),() => {
    console.log(`express is up on ${app.get('port')}` )
})
