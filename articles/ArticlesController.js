const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Article = require("./Articles")
const slugify = require("slugify")

router.get("/admin/articles", (req, res) =>{
    res.send("Rota de Artigos");
});

router.get("/admin/articles/new", (req, res) =>{
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    })
});

router.post("/articles/save", (req, res) => {
    var {title, body, category} = req.body;

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    })
})

module.exports = router;