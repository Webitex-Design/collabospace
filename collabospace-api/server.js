const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require('socket.io')
require("dotenv/config");

/*===================================*/
//            Auth Server             //
/*===================================*/

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json());

//Import Routes
const userAuthRoutes = require("./authserver/routes/users");

//use Routes
app.use("/userAuth", userAuthRoutes);

//DB connection
mongoose.connect(
    "mongodb://localhost:27017/Collabospace",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        console.log("Connected to DB!");
    }
);


/*===================================*/
//            Chat Server             //
/*===================================*/

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

const io = socket(server);
require('./utils/socket')(io);