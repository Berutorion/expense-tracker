
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("認證成功");
        next();
    } else {
        res.redirect("/users/login");
    }

}