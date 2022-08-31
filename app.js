const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const { appendFile } = require("fs");
require("dotenv").config();

const port = process.env.PORT || 3000;
//connet to mongoDB
require("./config/mongoose");
//set handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.listen(port, () => {
    console.log(`Express server is working on http://localhost:${port}`)
})

app.get("/", (reg, res) => {
    res.render("index");
})

app.get("/new", (req, res) => {
    res.render("new");
})

app.get("/edit", (req, res) => {
    res.render("edit");
})