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


app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(8081, () =>{
    console.log("RODANDO"); 
});
