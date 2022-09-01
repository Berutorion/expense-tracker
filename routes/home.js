const router = require("express").Router()

router.get("/", async(req, res) => {
    res.redirect("/records");
})

module.exports = router;