const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

//            Auth Server             //
/*===================================*/

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json());

//Import Routes
const userAuthRoutes = require("./routes/users");

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

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

/*===================================*/