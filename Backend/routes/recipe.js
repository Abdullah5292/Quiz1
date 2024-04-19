const User = require("../models/Users");
const Recipe = require("../models/Recipe");
const Ingredients = require("../models/Ingredients");

const crypto = require('crypto');
const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")



// •	Admin can add new recipes with their ingredients
// •	User can see all recipes
// •	User can click one recipe and see all of it’s details and ingredients (hint: use mongoose.populate)



router.get('/getallRecipes', async (req, res) => {
    try {
        const recipe = await Recipe.find();
        if (!recipe) return res.json({ msg: 'No recipes currently available' });
        res.json({ msg: 'Available recipe Found', data: recipe });
    } catch (error) {
        console.error(error);
    }
});
// router.get("/getRecipe", async (req, res) => {
//     try {

//         const user = await User.findById().populate('recipe');
//         if (!user) return res.json({ msg: 'No recipes currently available' });
//         res.json({ msg: 'Available recipe Found', data: Recipe });
//     } catch (error) {
//         console.error(error);
//     }
// });


/******* above are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "Unauthorized. Only admin users can perform this action" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

//admin will add recipe 

router.post("/addRecipe", async (req, res) => {
    try {
        const { name, description, ingredients } = req.body;
        if (!name || !description || !ingredients) return res.json({ msg: "All fields are required" })
        await Recipe.create(req.body);
        return res.json({ msg: "Recipe added successfully" })
    } catch (error) {
        console.error(error)
    }
});

// router.post()
module.exports = router;
