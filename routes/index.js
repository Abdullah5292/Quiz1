const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const recipeRouter = require("./recipe");
const ingredientRouter = require("./ingredient");



router.use("/auth", authRouter);


router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        const user = jwt.verify(token?.split(" ")[1], "MY_SECRET")
        console.log(user);
        req.user = user;
        next()
    } catch (e) {
        console.log(e)
        return res.json({ msg: "INVALID" })

    }
})

router.use("/recipe", recipeRouter);
router.use("/ingredient", ingredientRouter);
router.use("/auth", authRouter)

module.exports = router;