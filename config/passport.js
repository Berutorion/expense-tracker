const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    //local
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
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
    //facebook
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.CALLBACKURL,
        profileFields: ['id', 'displayName', 'email']
    }, async(accessToken, refreshToken, profile, done) => {
        const { email,name } = profile._json;

        try {
            const user = await User.findOne({ email })
            if (user) {
                return done(null, user, {message: "登入成功"});
            }

            const hash = await bcrypt.hash(Math.random().toString(36).slice(-8),
                await bcrypt.genSalt(10));
            const registeredUser = await User.create({ name, email, password: hash });
            done(null, registeredUser);
        
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