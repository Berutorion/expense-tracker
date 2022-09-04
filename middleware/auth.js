
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("warning_msg" , "請先登入再繼續!")
        res.redirect("/users/login");
    }

}