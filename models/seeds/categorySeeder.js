require("dotenv").config();
const db = require("../../config/mongoose");
const Category = require("../Category");
const categoryList = require("../../data/category.json").results;


db.once("open", async () => {
    try {
           Promise.all( categoryList.map(async(category) => {
        return await Category.create({id:category.id,name:category.name})
           })).then(() => {
               console.log("is done");
               process.exit();
     })
    } catch (error) {
        console.log(error);
    }
 
})