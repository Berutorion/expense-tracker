const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Localpassport = require("passport-local").Strategy;

module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new Localpassport({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                console.log("這個email還沒有註冊!");
                return done(null, false, { message: "這個email還沒有註冊!" });
            } 
            bcrypt.compare(password, user.password, (err,isMatch) => {
                if (err) return done(err, false);
                if (isMatch) {
                    console.log("登入成功");
                    return done(null, user, { message: "登入成功" });
                } 
                console.log("帳號或密碼錯誤");
                return done(null, false, { message: "帳號或密碼錯誤" });
         })
        } catch (error) {
            done(error, false);
        }
    
    }))

    passport.serializeUser((user, done) => {
        console.log("serializeUser" , user);
        return done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            console.log("deserializeUser", id);
            const user = await User.findById(id);
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
     
    })

}