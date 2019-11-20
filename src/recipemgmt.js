const RECIPE_DIR = "db/recipes";

let 

function constructPage(data) {
  
}

function displayError() {
  
}

function getRecipe(id) {
  ajaxGet("api/getrecipe.php", {
    args: {id: id,},
    on: {
      "200": (json) => {
        try {
          let data = JSON.parse(data);
        } catch (ex) {
          console.error(ex.message);
          displayError();
          return;
        }
        
        constructPage(data);
      },
      "404": () => {
        console.error(`Recipe #${id} does not exist`);
        displayError();
      },
      "500": () => {
        console.error(`Error loading recipe #${id}`);
        displayError();
      },
    },
  });
}