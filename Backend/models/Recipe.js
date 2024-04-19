const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        description: {
            type: String
        },
        ingredients: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' }],
            default: []
        },
        creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
);
const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;