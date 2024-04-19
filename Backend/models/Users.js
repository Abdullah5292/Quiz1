const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: String,
    name: {
        type: String,
        required: true,
    },

    admin: { type: Boolean, default: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]

});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;