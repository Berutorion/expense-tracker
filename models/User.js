const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:2,
        max:10
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);