const Record = require("../models/Record");
const Category = require("../models/Category");
const router = require("express").Router();
const categoryIconList = require("../data/categoryIcon.json").categoryIcon;


//列出清單
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ id: "asc" }).lean();
        const categoryId = Number(req.query.categoryId);
        const userId = req.user._id;
        if (categoryId) {
            const records = await Record.find({ categoryId,userId}).lean();
            const category = categories.find((item) => {return item.id === categoryId})
            return res.render("index", {records, categories, category,categoryIconList });
        } else {
            const records = await Record.find({userId}).lean();
            res.render("index", {records, categories,categoryIconList});
        }
    } catch (error) {
            console.log(error);
   }
  
}
    )

///獲得新增表單
router.get("/new", async(req, res) => {
     const categories = await Category.find().sort({ id: "asc" }).lean();
    res.render("new",{categories});
})
//獲得修改表單
router.get("/:_id/edit", async (req, res) => {
    try {
        const { _id } = req.params;
        const userId = req.user._id;
        const record = await Record.findOne({ _id ,userId}).lean();
        const categories = await Category.find().sort({ id: "asc" }).lean();
        res.render("edit", { record, categories});
    } catch (error) {
        console.log(error);
    }
  
})
//新增資料
router.post("/", async(req, res) => {
    const { name, date, categoryId, amount } = req.body;
    const userId = req.user._id;
    try {
        await Record.create({ name, date, categoryId, amount ,userId});
        req.flash("success_msg","新增成功");
        res.redirect("/records");
    } catch (error) {
        console.log(error);
    }  

})


//修改資料
router.put("/:_id", async(req, res) => {
    const { name, date, categoryId, amount } = req.body;
    const { _id } = req.params;
    const userId = req.user._id;
    try {
        await Record.updateOne({ _id }, { name, date, categoryId, amount ,userId})
        req.flash("success_msg","修改成功");
        res.redirect("/records");
    } catch (error) {
        console.log(error);
    }
})
//刪除資料
router.delete("/:_id", async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id;
    try {
        await Record.deleteOne({ _id,userId });
    } catch (error) {
        console.log(error);
    }
  res.redirect("/records")
})


module.exports = router;