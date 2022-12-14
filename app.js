const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
require("dotenv").config();
const router = require("./routes/router");
const methodOverride = require('method-override')
const session = require("express-session");
const flash = require("connect-flash");
require("./views/helper/helper");

const port = process.env.PORT || 3000;
//connet to mongoDB
require("./config/mongoose");
//set handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");


//bosy-parser
app.use(express.urlencoded({ extended: true }));
//method-override
app.use(methodOverride('_method'))
app.listen(port, () => {
    console.log(`Express server is working on http://localhost:${port}`)
})
//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:true
}))


require("./config/passport")(app);

//connect-flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.warning_msg = req.flash("warning_msg");
    next();
})



//route
app.use(router);