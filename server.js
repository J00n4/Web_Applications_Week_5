


const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;

app.use(express.json());
//app.use(express.urlencoded({extended: false}));



//app.use(express.static(path.join(__dirname, "public")));

let recipes = [
    {recipe: "pizza instructions ingredients"},
    {recipe: "pasta instructions ingredients"},
    {recipe: "potatoes instructions ingredients"}
];

app.get("/recipe/:food", (req, res) => {
    /*res.json(recipes[req.params.food]);
    const meal = req.query.food;
    const instructions = {};
    const ingredients = {};
    res.send({
        'Food': meal,
        'Instructions': instructions,
        'Ingredients': ingredients
    });*/
    const name = req.params.food;
    const instructions = {};
    const ingredients = {};
    res.json({name});
    //res.send(req.params);
});


app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

//app.use("/api/poems", require("./api/poems.js"));


app.listen(port, () => console.log(`Server listening a port ${port}!`));





/*

const http = require("http");

console.log("Server running... fully!")

http.createServer(function(req,res) {
    console.log(req);
    res.write("Hello World!!");
    res.end();
    console.log("Browser reached us!")
}).listen(8000);*/