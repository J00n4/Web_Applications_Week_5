


const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const path = require("path");
const app = express();
const port = 1234;

//const mongoDB = process.env.MONGO_URL;
const mongoDB = "mongodb://localhost:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('views', path.join(__dirname, 'public'));
//app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "api")));


app.use("/recipe/", require("./api/poems.js"));

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

