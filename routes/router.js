const router = require("express").Router();
const homeRoute = require("./home");
const recordRoute = require("./record");
const userRoute = require("./user");
const authRoute = require("./auth");
const authenticator = require("../middleware/auth");


router.use("/records",authenticator, recordRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/",authenticator, homeRoute);


module.exports = router;