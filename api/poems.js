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

router.get("/", (req, res) => {
    res.json(poems);

})

router.get("/:id", (req, res) => {
    res.json(poems[req.params.id]);

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