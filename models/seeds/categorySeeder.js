require("dotenv").config();
const db = require("../../config/mongoose");
const Category = require("../Category");
const categoryList = require("../../data/category.json").results;


db.once("open", async () => {
    try {

        if (await Category.estimatedDocumentCount() >= categoryList.length) {
            console.log("種子資料已經建立");
            process.exit();
        }

           Promise.all( categoryList.map(async(category) => {
        return await Category.create({id:category.id,name:category.name})
           })).then(() => {
               console.log("種子資料已建立完成");
               process.exit();
     })
    } catch (error) {
        console.log(error);
    }
 
})