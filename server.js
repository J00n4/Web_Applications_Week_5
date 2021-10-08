


const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(express.static(path.join(__dirname, "public")));

let recipes = [
    {name: "pizza", instructions: "instructions", ingredients: "ingredients"},
    {name: "pasta", instructions: "instructions", ingredients: "ingredients"},
    {name: "potatoes", instructions: "instructions", ingredients: "ingredients"}
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

/*app.get("/", (req, res) => {
    res.render();
});*/

//app.use("/api/poems", require("./api/poems.js"));

/* Tehtävä 2 alkaa
app.set("view engine", "jade")

app.get('/test', function (req, res) {
    var sql = require("mssql");

    var config = {
        meal = req.params.food,
        instructions = req.params.instructions,
        ingredients = req.params.ingredients
    };

    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();

        request.query('select * from Recipe', function (err, recordset) {
            if (err) {
                console.log(err)
            } else {
                res.render('Recipe', {Recipe: recordset})
            }
        });
    });
});
Tehtävä 2 loppuu*/

/*app.post('/recipe/', urlencodedParser, function (req, res) {
    response = {
        food_name = req.body.food_name,
        ingredients = req.body.ingredients,
        instructions = req.body.instructions
    };
    console.log(response);
    res.end(JSON.stringify(response));
})*/

app.post("/recipe/", (req, res) => {
    recipes.push(req.body);
    console.log("This is getting added: " + JSON.stringify(req.body));

    res.send(req.body);
});

app.get("/recipe/", (req, res) => {
    res.json(recipes);
    res.send("This page is for recipes");
});

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