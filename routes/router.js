const router = require("express").Router();
const homeRoute = require("./home");
const recordRoute = require("./record");

router.use("/records", recordRoute);
router.use("/", homeRoute);


module.exports = router;