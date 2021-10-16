const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipes");
const Category = require("../models/category")
const router = express.Router();
//const fs = require("fs");

let poems = [];

/*fs.readFile('./data/poems.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    poems = JSON.parse(data);
    console.log("Data loaded!")
})*/



let recipes = [
    {name: "pizza", instructions: "instructions", ingredients: "ingredients", categories: ""},
    {name: "pasta", instructions: "instructions", ingredients: "ingredients", categories: ""},
    {name: "potatoes", instructions: "instructions", ingredients: "ingredients", categories: ""}
];

/*router.get("/recipe/:food", (req, res) => {
    /*res.json(recipes[req.params.food]);
    const meal = req.query.food;
    const instructions = {};
    const ingredients = {};
    res.send({
        'Food': meal,
        'Instructions': instructions,
        'Ingredients': ingredients
    });
    const name = req.params.food;
    const instructions = [];
    const ingredients = [];
    res.json({name});
    //res.send(req.params);
});*/

/*router.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");

});*/

/*router.get("/", (req, res) => {
    res.json(recipes);
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

/*router.post("/recipe/", (req, res, next) => {
    //recipes.push(req.body);
    //console.log("This is getting added: " + JSON.stringify(req.body));

    res.send(req.body);
});*/

/*router.get("/recipe/", (req, res) => {
    res.send(recipes);
    //res.send(req.body);
    //res.json(recipes);
    //res.send("This page is for recipes");
});*/


router.post("/", (req, res, next) => {
    Category.findOne({ name: req.body.name}, (err, name) => {
        if(err) return next(err);
        if(!name) {
            new Category({
                name: req.body.name
            }).save((err) => {
                if(err) return next(err);
                recipes.categories.push(req.body.name);
                return res.send(req.body);
            });
        } else {
            return res.status(403).send("Already has that diet!");
        }
    });
})


router.get("/", (req, res, next) => {
    //res.json(recipes);
    Category.find({}, { projection: { _id: 1, name: 1 } }).toArray((err, result) => {
        if (err) return next(err);
        if (result) {
            //res.send(name);
            console.log(result);
            for (i = 0; i < result.length; i++) {
                const box = document.getElementById("check" + (i+1));
                document.getElementById("test-area2").innerText = result[i].name;
                var attribute = result[i]._id.toString();
                box.setAttribute("id", attribute);
                const newCategory = document.createElement("div");
                const newItem = document.createElement("input");
                newItem.setAttribute("id", attribute);
                newItem.setAttribute("type", "checkbox");
                newItem.innerText = result[i].name;
                newCategory.appendChild(newItem);
                const newAppend = document.getElementById("category-list");
                newAppend.appendChild(newCategory);
            }
            //const box1 = document.getElementById("check1");
            //box1.setAttribute("id", result)
            return res.json(result);
        } else {
            return res.status(404).send("Not found")
        }
    })

})



router.get("/recipe/", (req, res, next) => {
    //res.json(recipes);
    Recipe.find({}, (err, recipes) => {
        if (err) return next(err);
        if (recipes) {
            return res.json(recipes);
        } else {
            return res.status(404).send("Not found")
        }
    })

})

router.get("/recipe/:food", (req, res, next) => {
    //res.json(poems[req.params.id]);
    Recipe.findOne( {name: req.params.food}, (err, name) => {
        if (err) {
            if (err.name === "CastError") {
                return res.status(404).send(`Recipe id ${req.params.food} not found!`);
            }
            return next(err);
        }
        if (name) {
            return res.send(name);
        } else {
            return res.status(404).send(`Recipe id ${req.params.food} not found!`);
        }

    })

})

router.post("/recipe/", (req, res, next) => {
    Recipe.findOne({ name: req.body.name}, (err, name) => {
        if(err) return next(err);
        if(!name) {
            new Recipe({
                name: req.body.name,
                instructions: req.body.instructions,
                ingredients: req.body.ingredients,
                categories: req.body.categories
            }).save((err) => {
                if(err) return next(err);
                recipes.push(req.body);
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