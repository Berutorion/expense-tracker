const Handlebars = require("handlebars");
  

Handlebars.registerHelper("hello", (option) => {
    return "Hello";
})



module.exports = Handlebars;