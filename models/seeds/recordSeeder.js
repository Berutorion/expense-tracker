require("dotenv").config();
const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const Record = require("../Record");
const User = require("../User");
const recordList = require("../../data/record.json").results;
const user = require("../../data/user.json").user;


db.once("open", async () => {
    const {name,email,password } =  user
    try {
        //如果已經建立過直接結束程式
        if (await User.findOne({email})) {
            console.log("種子資料已經建立");
            process.exit();
        }
        //建立使用者資料
        const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const registered =  await User.create({name,email,password:hash })
        const userId = registered._id;
        //建立支出紀錄資料
        Promise.all(recordList.map(async (record) => {
            const { name, date, amount, categoryId } = record;
        return await Record.create({name, date, amount, categoryId ,userId})
           })).then(() => {
               console.log("種子資料已建立完成");
               process.exit();
     })
    } catch (error) {
        console.log(error);
    }
 
})