const express = require("express");
const mongoose = require("mongoose");
const Recipes = require("../models/Recipes");
const router = express.Router();
const fs = require("fs");

let poems = [];

fs.readFile('./data/poems.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    poems = JSON.parse(data);
    console.log("Data loaded!")
})



let recipes = [
    {name: "pizza", instructions: "instructions", ingredients: "ingredients"},
    {name: "pasta", instructions: "instructions", ingredients: "ingredients"},
    {name: "potatoes", instructions: "instructions", ingredients: "ingredients"}
];

router.get("/recipe/:food", (req, res) => {
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
    const instructions = [];
    const ingredients = [];
    res.json({name});
    //res.send(req.params);
});

/*router.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");

});*/

router.get("/", (req, res) => {
    res.json(recipes);
});

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

router.post("/recipe/", (req, res, next) => {
    //recipes.push(req.body);
    //console.log("This is getting added: " + JSON.stringify(req.body));

    res.send(req.body);
});

router.get("/recipe/", (req, res) => {
    res.send(recipes);
    //res.send(req.body);
    //res.json(recipes);
    //res.send("This page is for recipes");
});


router.get("/", (req, res, next) => {
    //res.json(poems);
    Recipes.find({}, (err, recipes) => {
        if (err) return next(err);
        if (recipes) {
            return res.json(recipes);
        } else {
            return res.status(404).send("Not found")
        }
    })

})

router.get("/:id", (req, res, next) => {
    //res.json(poems[req.params.id]);
    Recipes.findById( req.params.id, (err, recipes) => {
        if (err) {
            if (err.name === "CastError") {
                return res.status(404).send(`Recipe id ${req.params.id} not found!`);
            }
            return next(err);
        }
        if (recipes) {
            return res.send(recipes);
        } else {
            return res.status(404).send(`Recipe id ${req.params.id} not found!`);
        }

    })

})

router.post("/recipe/", (req, res, next) => {
    Recipes.findOne({ name: req.body.name}, (err, recipes) => {
        if(err) return next(err);
        if(!recipes) {
            new Recipes({
                name: req.body.name,
                instructions: req.body.instructions,
                ingredients: req.body.ingredients
            }).save((err) => {
                if(err) return next(err);
                return res.send(req.body);
            });
        } else {
            return res.status(403).send("Already has that recipe!");
        }
    });
    /*poems.push(req.body);
    
    fs.writeFile("./data/poems.json", JSON.stringify(poems), err => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Data saved!");
    })*/
    //res.send(req.body);
    //console.log("Poem: " + JSON.stringify(req.body) + " added!");
}) 



module.exports = router;