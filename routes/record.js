const Record = require("../models/Record");
const Category = require("../models/Category");
const router = require("express").Router();
const Handlebars = require("handlebars");

//列出清單
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ id: "asc" }).lean();
        const  categoryId  = Number(req.query.categoryId);
        if (categoryId) {
            const records = await Record.find({ categoryId }).lean();
            const category = categories.find((item) => {return item.id === categoryId})
            console.log(category);
            return res.render("index", {
                records, categories, category, helpers: {
                    "dateformate": (date) => {
                        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                    }
            } });
        } else {
            const records = await Record.find().lean();
            res.render("index", {
                records, categories, helpers: {
                    "dateformate": (date) => {
                        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                    }
                }
            });
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
        const record = await Record.findOne({ _id }).lean();
        const categories = await Category.find().sort({ id: "asc" }).lean();
        res.render("edit", { record, categories, helpers:{
            "set": (categoryId, categoryList) => {
                let result = "";
                categoryList.forEach((category) => {
                    if (category.id == categoryId) {
                        result = category.name;
                    }  
                })
                return result
            },
            "dateformate": (date) => {
                const month = (date.getMonth() > 10) ? date.getMonth() : "0" + date.getMonth();
                const day = (date.getDay() > 10) ? date.getDay() : "0" + date.getDay();
                const dates = date.getFullYear() + "-" + month + "-" + day;
                console.log(dates);
               return dates;
            }
        }});
    } catch (error) {
        console.log(error);
    }
  
})
//新增資料
router.post("/", async(req, res) => {
    const { name, date, categoryId, amount } = req.body;
    console.log("new");
    try {
        await Record.create({ name, date, categoryId, amount });
        req.flash("success_msg","新增成功");
        res.redirect("/records");
    } catch (error) {
        console.log(error);
    }  

})


//修改資料
router.put("/:_id", async(req, res) => {
    const { name, date, categoryId, amount } = req.body;
    const {_id} = req.params;
    try {
        await Record.updateOne({ _id }, { name, date, categoryId, amount })
        req.flash("success_msg","修改成功");
    res.redirect("/records");
    } catch (error) {
        console.log(error);
    }
})
//刪除資料
router.delete("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        await Record.deleteOne({ _id });
    } catch (error) {
        console.log(error);
    }
  res.redirect("/records")
})


module.exports = router;