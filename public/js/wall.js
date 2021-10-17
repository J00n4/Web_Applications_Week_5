if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {
    /*const options = {
        edge: 'right',
        draggable: false,
        inDuration: 250,
        outDuration: 200,
        onOpenStart: null,
        onOpenEnd: null,
        onCloseStart: null,
        onCloseEnd: null,
        preventScrolling: true
    };*/
    fetch("/recipe/:food")
        .then(response => response.json())
        .then(data => {
            document.getElementById("test-header").innerText = data.name;
            document.getElementById("test-area").innerText = data.instructions;
            document.getElementById("test-area2").innerText = data.ingredients;
        })
    const addIngredientsButton = document.getElementById("add-ingredient");
    const addInstructionButton = document.getElementById("add-instruction");
    const addRecipeButton = document.getElementById("submit");
    var ingredientsList = [];
    var instructionsList = [];
    var name = "";
    var checkList = [];

    addIngredientsButton.addEventListener("click", function() {
        const ingredientInput = document.getElementById("ingredients-text").value;
        //var ingredientsList = [];
        ingredientsList.push(ingredientInput);
        //var tField = document.getElementById("test-area"); 
        //tField.append(ingredientsList);
        //document.getElementById("test-area").innerHTML = ingredientsList;
    });

    addInstructionButton.addEventListener("click", function() {
        const instructionInput = document.getElementById("instructions-text").value;
        //var instructionsList = [];
        instructionsList.push(instructionInput);
        //var tField = document.getElementById("test-area2"); 
        //tField.append(instructionsList);
        //document.getElementById("test-area").innerHTML = instructionsList;
    });

    addRecipeButton.addEventListener("click", function() {
        const nameInput = document.getElementById("name-text");
        var hField = document.getElementById("test-header");
        var tField = document.getElementById("test-area");
        var tField2 = document.getElementById("test-area2");
        //hField.append(nameInput.value);
        
        
        const diet1 = document.getElementById("check1");
        const diet2 = document.getElementById("check2");
        const diet3 = document.getElementById("check3");
        const dietField = document.getElementById("category-list");

        if(diet1.checked) {
            checkList.push(diet1.id);
        } if(diet2.checked) {
            checkList.push(diet2.id);
        } if(diet3.checked) {
            checkList.push(diet3.id);
        }

        fetch("/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            }/*,
            body: JSON.stringify({
                name: categories.name
            })*/
        })
        .then(response => response.json())
        .then(data => {
            /*const newField = document.createElement("input");
            newField.setAttribute("type", "checkbox");
            newField.innerText(data.name);
            dietField.appendChild(newField);*/

            for (i = 0; i < data.length; i++) {
                //const box = document.getElementById("check" + (i+1));
                //document.getElementById("test-area2").innerText = result[i].name;
                var attribute = data[i]._id.toString();
                //box.setAttribute("id", attribute);
                const newCategory = document.createElement("div");
                const newItem = document.createElement("input");
                newItem.setAttribute("id", attribute);
                newItem.setAttribute("type", "checkbox");
                newItem.innerText = data[i].name;
                newCategory.appendChild(newItem);
                const newAppend = document.getElementById("category-list");
                newAppend.appendChild(newCategory);
            }
        })

        fetch("/recipe/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                instructions: instructionsList,
                ingredients: ingredientsList,
                categories: checkList
            })
            //body: '{ "name": "' + nameInput.value + '"instructions": "' + JSON.stringify(instructionsList) + '" "ingredients": "' + JSON.stringify(ingredientsList) + '"  }'
            //body: '{ "name": "' + nameInput + ' "instructions": "' + instructionsList + '" "ingredients": "' + ingredientsList + '" }'
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
               hField.append(data.name);
               tField.append(data.ingredients);
               tField2.append(data.instructions);
           })
    })

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, options);
    });

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", function(e) {
        //document.getElementById("test-header").innerText = searchInput.value;
        //var test_input = searchInput.value;
        if (e.key === 'Enter' || e.keyCode === 13) {
            //e.preventDefault();
            //var test_input = searchInput.value;
            //document.getElementById("test-header").innerText = "/recipe/" + test_input;
            fetch("/recipe/" + searchInput.value)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("test-header").innerText = data.name;
                    document.getElementById("test-area2").innerText = data.instructions;
                    document.getElementById("test-area").innerText = data.ingredients;
                })
            //document.getElementById("test-header").innerText = test_input;
        }
    });


    /*var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/testdb";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("categories").find({}, { projection: { _id: 1, name: 1 } }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            for (i = 0; i < result.length; i++) {
                const box = document.getElementById("check" + (i+1));
                document.getElementById("test-area2").innerText = result[i].name;
                box.setAttribute("id", result[(i+1)]._id);
            }
            db.close();
        });
    });*/



    /*const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, options);

    const addPoemButton = document.getElementById("add-poem");
    

    addPoemButton.addEventListener("click", function() {
        const poemInput = document.getElementById("poem-input");
        
        const vip = document.getElementById("vip");

        fetch("http://localhost:8000/api/poems", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "poem": "' + poemInput.value + '" }'
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
           })


        addNewPoem(poemInput.value, vip.checked);

    });*/

    /*const addPoemButtonFromApi = document.getElementById("add-poem-from-api");

    addPoemButtonFromApi.addEventListener("click", function() {

        fetch("http://localhost:8000/api/poems")
            .then(response => response.json())
            .then(data => {
                data.forEach(poem => {
                    addNewPoem(poem.poem, false);  

                });
            });


        //loadJson();

    });*/

}

/*async function loadJson() {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let response = await fetch(url);

    let poems = await response.json();
    console.log(poems);

    poems.forEach(poem => {
        addNewPoem(poem.title, false);    
    });

    


}*/


/*function addNewPoem(poem, vip) {
    const theWall = document.getElementById("the-wall");
    let newListItem = document.createElement("li");

    if (vip == true) {
        newListItem.classList.add("vip");
    }

    newListItem.classList.add("col", "s6", "m4", "l3");

    newListItem.appendChild(document.createTextNode(poem));

    theWall.appendChild(newListItem);
    console.log("Working... adding new stuff...")
}*/