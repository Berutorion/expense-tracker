require("dotenv").config();
const db = require("../../config/mongoose");
const Record = require("../Record");
const recordList = require("../../data/record.json").results;


db.once("open", async () => {
    try {
        Promise.all(recordList.map(async (record) => {
            const { name, date, amount, categoryId } = record;
        return await Record.create({name, date, amount, categoryId})
           })).then(() => {
               console.log("is done");
               process.exit();
     })
    } catch (error) {
        console.log(error);
    }
 
})