const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv/config");




router.post("/new-user", async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({
            message: "No input data provided",
        });
    }

    var user;

    try {
        const queriedUser = await User.findOne({ username: req.body.username });
        user = queriedUser;
    } catch (err) {
        return res.status(500).json({
            status: "Server Error at user query",
            message: err,
        });
    }

    if (user) {
        return res.status(400).json({
            status: "Request rejected",
            message: "Account with username already exists",
        });
    }

    var hashedPassword;

    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);
        hashedPassword = hash;
        console.log(hashedPassword);
    } catch (err) {
        return res.status(500).json({
            status: "Server Error at password hash",
            message: err,
        });
    }

    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json({
            status: "Created",
            data: savedUser,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Server Error at user creation",
            message: err,
        });
    }
});

router.post("/login", async (req, res) => {
    const auth = req.headers.authorization;
    const date = Date.now() + 2592000000;

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
    );
    const [username, password] = credentials.split(":");

    if (!auth || !username || !password) {
        return res.status(401).json({
            status: "Authorization Error at input",
            message: "Please enter authorization information",
        });
    }

    var user;
    try {
        const queriedUser = await User.findOne({ username: username });
        user = queriedUser;
    } catch (err) {
        return res.status(500).json({
            status: "Server Error at user query",
            message: err,
        });
    }
    if (!user) {
        return res.status(401).json({
            status: "Request rejected",
            message: "User not found",
        });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(
                { id: user._id, exp: date },
                "key"
            );
            return res.json({
                token: accessToken,
                expiresIn: "undefined",
            });
        } else {
            return res.status(401).json({
                status: "Unauthorized",
                message: "Incorrect password entered for user",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "Server Error at password authentication",
            message: err,
        });
    }
});

router.get("/user-profile", authenticateUserToken, async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json({
            status: "Success",
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            status: "Server Error at user query",
            message: err,
        });
    }
});


function authenticateUserToken(req, res, next) {
    var token;
    if (req.headers["access-token"]) {
        token = req.headers["access-token"];
    } else {
        return res.status(401).json({
            status: "Authentication Error",
            message: "No token",
        });
    }

    jwt.verify(token, "key", (err, user) => {
        if (err) {
            return res.status(403).json({
                status: "Forbidden",
                message: "Not authorized to perform this action",
            });
        }
    });
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    console.log(user);
    next();
}




module.exports = router;