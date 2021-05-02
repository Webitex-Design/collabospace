const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require('socket.io')
require("dotenv/config");

/*===================================*/
//            Chat Server             //
/*===================================*/


const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index')
})

//Get username and roomname from form and pass it to room
app.post('/room', (req, res) => {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

//Rooms
app.get('/room', (req, res) => {
    res.render('room')
})

const server = app.listen(port, () => {
    console.log("Server listening on port " + port);
});




const io = socket(server, {
    allowEIO3: true
});
require('./utils/socket')(io);

