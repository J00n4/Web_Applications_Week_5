const mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/testdb");

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    name: String,
    instructions: [String],
    ingredients: [String],
    categories: []
});

module.exports = mongoose.model("Recipes", recipeSchema);