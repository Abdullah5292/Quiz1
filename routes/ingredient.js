const Users = require("../models/Users");
const Recipe = require("../models/Recipe");
const Ingredients = require("../models/Ingredients");
const crypto = require('crypto');
const bcrypt = require("bcrypt");

var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")


router.get('/getallIngredients', async (req, res) => {
    try {
        const ingredient = await Ingredients.find();
        if (!ingredient) return res.json({ msg: 'No ingredients currently available' });
        res.json({ msg: 'Available ingredients Found', data: ingredient });
    } catch (error) {
        console.error(error);
    }
});

/******* above are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "Unauthorized. Only admin users can perform this action" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

// only admin can add ingredients 
router.post("/addingredients", async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) return res.json({ msg: "All fields are required" })
        //ingredient not repeated 
        let Ingredients_same = await Ingredients
        if (await Ingredients_same.findOne({ name })) return res.json({ msg: "Ingredient already exists" })

        await Ingredients.create(req.body);
        return res.json({ msg: "Ingredient added successfully", data: req.body })
    } catch (error) {
        console.error(error)
    }
});




module.exports = router
