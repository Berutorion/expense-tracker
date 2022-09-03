const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register",async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
        await User.create({ name, email, password:hash })
        console.log("註冊成功");
        res.redirect("/users/login");
    } catch (error) {
        console.log(error);
        
    }
})

module.exports = router;