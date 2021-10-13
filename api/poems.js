const express = require("express");
const mongoose = require("mongoose");
const Recipes = require("../models/Recipes");
const router = express.Router();
const fs = require("fs");

let poems = [];

let recipes = [];

fs.readFile('./data/poems.json', "utf-8", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    poems = JSON.parse(data);
    console.log("Data loaded!")
})

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
    Recipes.findOne({ name: req.body.recipes}, (err, recipes) => {
        if(err) return next(err);
        if(!recipes) {
            new Recipes({
                name: req.body.recipes,
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