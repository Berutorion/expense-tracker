const Record = require("../models/Record");
const Category = require("../models/Category");
const router = require("express").Router();

//列出清單
router.get("/", async(req, res) => {
    const record = await Record.find().lean();
    const category = await Category.find().sort({ id: "asc" }).lean();
    res.render("index", record,category);
})
///獲得新增表單
router.get("/new", async(req, res) => {
     const category = await Category.find().sort({ id: "asc" }).lean();
    res.render("new",{category});
})
//獲得修改表單
router.get("/edit", (req, res) => {
    res.render("edit");
})
//新增資料
router.post("/", (req, res) => {
    const { name, date, category, amout } = req.body;
})
//修改資料
router.put("/", (req, res) => {
    
})
//刪除資料
router.delete("/", (req, res) => {
    
})
module.exports = router;