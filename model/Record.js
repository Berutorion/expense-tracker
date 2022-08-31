const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max:30
    } ,
    date: {
        type: Date,
        default:Date.now
    },
    amout: {
        type: Number,
        min:0
    } ,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true
    }
})

module.exports = mongoose.model("Record", RecordSchema);