const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router.get("/login", (req, res) => {
    res.render("login");
})
//帳號登入
router.post("/login", passport.authenticate("local", {
    successRedirect: '/records',
    failureRedirect: '/users/login'
}))

router.get("/register", (req, res) => {
    res.render("register");
})
//帳號註冊
router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
    const warning =[];
   //檢查email是否重複
   if (await User.findOne({ email })) {
    warning.push("這個email已經被註冊過了!!");
}
//檢查是否有空欄位
if (!name | !email | !password | !confirmPassword) warning.push("不得有欄位為空值!!");
//檢查兩次密碼輸入是否一致
if (password != confirmPassword) warning.push( "密碼與密碼確認須為一致!!");

if (warning.length > 0) {
    req.flash("warning_msg", warning[0]);
    return res.render("register", { name, email, password, confirmPassword ,warning_msg:req.flash("warning_msg")});
}

        const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
        await User.create({ name, email, password: hash });
        req.flash("success_msg", "註冊成功");
        res.redirect("/users/login");
    } catch (error) {
        console.log(error);
        
    }
})

//帳號登出
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return console.log(err);
        req.flash("success_msg" , "帳號已登出")
        res.redirect("/users/login");
  })
    
}) 
module.exports = router;