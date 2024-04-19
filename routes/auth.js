

const bcrypt = require("bcrypt");
const Users = require("../models/Users");


const crypto = require('crypto');
const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")
const MY_SECRET = "MY_SECRET";

router.post("/signUp", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await Users.findOne({ email })
        console.log(user);
        if (user) {
            console.log('username already exists')
            return res.json({ msg: "Email is in use already" })
        }
        // Email validation here
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.json({ msg: "Invalid email format" });
        }

        // Add password validation here
        if (password.length < 5) {
            return res.json({ msg: "Password is too short" })
        }
        // Check for special characters
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacters.test(password)) {
            return res.json({ msg: "Password must contain a special character" });
        }

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "SignUp Successful" })
    } catch (error) {
        console.error(error)
    }

});

router.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body

        const user = await Users.findOne({ username })
        if (!user) return res.json({ msg: "User not found" })
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "Incorrect Password" })
        const token = jwt.sign({
            username,
            userId: user.userId,
            createdAt: new Date(),
            admin: user.admin,
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = router;
