const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("connect to mongoDB.")
    }).catch((error) => {
    console.log(error)
})

const db = mongoose.connection;

module.exports = db