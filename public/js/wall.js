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
    const addIngredientsButton = document.getElementById("add-ingredient");
    const addInstructionButton = document.getElementById("add-instruction");
    const addRecipeButton = document.getElementById("submit");
    var ingredientsList = [];
    var instructionsList = [];

    addIngredientsButton.addEventListener("click", function() {
        const ingredientInput = document.getElementById("ingredients-text").value;
        //var ingredientsList = [];
        ingredientsList.push(ingredientInput);
        var kentta = document.getElementById("test-area"); 
        kentta.append(ingredientsList);
        document.getElementById("test-area").innerHTML = ingredientsList;
    });

    addInstructionButton.addEventListener("click", function() {
        const instructionInput = document.getElementById("instructions-text").value;
        //var instructionsList = [];
        instructionsList.push(instructionInput);
    });

    addRecipeButton.addEventListener("click", function() {
        const nameInput = document.getElementById("name-text");

        fetch("/recipe/", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "recipe": "' + nameInput.value + '"instructions": "' + instructionsList + '" "ingredients": "' + ingredientsList + '"  }'
            //body: '{ "name": "' + nameInput + ' "instructions": "' + instructionsList + '" "ingredients": "' + ingredientsList + '" }'
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
           })
    })

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