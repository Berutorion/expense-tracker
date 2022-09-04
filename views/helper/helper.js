const Handlebars = require("handlebars");
  
Handlebars.registerHelper("dateformate", (date) => {
    const month = (date.getMonth() > 10) ? date.getMonth() : "0" + date.getMonth();
    const day = (date.getDay() > 10) ? date.getDay() : "0" + date.getDay();
    const dates = date.getFullYear() + "-" + month + "-" + day;
    return dates;
}) 

Handlebars.registerHelper("set", (categoryId, categoryList) => {
    let result = "";
    categoryList.forEach((category) => {
        if (category.id == categoryId) {
            result = category.name;
        }  
    })
    return result
})

Handlebars.registerHelper("totalAmount", (records) => {
    let total = 0;
    records.forEach((record => {
        total += Number(record.amount);
    }))

    return total;
})

Handlebars.registerHelper("setIcon", (categoryIconList, categoryId,option) => {
    console.log(categoryIconList)
    console.log(categoryId)
    const icon = categoryIconList.find((icon) => { return icon.id === Number(categoryId) })
    return new Handlebars.SafeString(icon.src);
})

module.exports = Handlebars;