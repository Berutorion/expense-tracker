const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    //local
    passport.use(new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
        

        try {
            const user = await User.findOne({ email });
            if (!user) {
                req.flash("warning_msg" , "這個email還沒有註冊!")
                return done(null, false,);
            } 
            bcrypt.compare(password, user.password, (err,isMatch) => {
                if (err) return done(err, false);
                if (isMatch) {
                    req.flash("success_msg" ,"登入成功" )
                    return done(null, user,);
                } 
                req.flash("warning_msg" , "帳號或密碼錯誤!")
                return done(null, false);
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
        profileFields: ['id', 'displayName', 'email'],
        passReqToCallback:true
    }, async (req,accessToken, refreshToken, profile, done) => {
        const { email,name } = profile._json;
        try {
            const user = await User.findOne({ email })
            if (user) {
                req.flash("success_msg" ,"登入成功" )
                return done(null, user);
            }

            const hash = await bcrypt.hash(Math.random().toString(36).slice(-8),
                await bcrypt.genSalt(10));
            const registeredUser = await User.create({ name, email, password: hash });
            req.flash("success_msg" ,"登入成功" )
            return  done(null, registeredUser);
        
        } catch (error) {
            return  done(error, false);
        }

      
    }))

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (error) {
            console.log(error);
        }
     
    })

}