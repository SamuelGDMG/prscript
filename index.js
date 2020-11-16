const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

const app = express();

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Articles");
const Category = require("./categories/Category");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso");
    }).catch(()=>{
        console.log(error);
    });

app.use(express.static('public'));

app.use("/", categoriesController);
app.use("/", articlesController);


app.listen(8081, () =>{
    console.log("RODANDO"); 
});

app.get("/", (req,res)=>{
    Article.findAll({
        order : [
            ["id", "DESC"]
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles : articles, categories : categories});
        })
    })
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where : {
            slug : slug
        }
    }).then((article) => {
        if(article !== undefined){
            Category.findAll().then((categories) => {
                res.render("article", {article : article, categories : categories})
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })

})

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where : {
            slug : slug
        },
        include : [{model : Article}]
    }).then(category => {
        if(category !== undefined){
            Category.findAll().then(categories => {
                res.render("index", {article : category.articles, categories : categories})
            });
        } 
        else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });

})