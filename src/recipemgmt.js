const RECIPE_DIR = "db/recipes";

let lblTitle = elemById('lblTitle');
let divContent = elemById('divContent');

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  lblTitle.innerText = data.title;
  
  let recipe = new Recipe(data);
  
  // Create the ingredients.
  let divIngredients = newElem('DIV', {
    classList: ['section'],
    parent: divContent,
  });
  let lblIngredientsHeader = newElem('H2', {
    innerText: 'Ingredients',
    parent: divIngredients,
  });
  let ulIngredients = newElem('UL', {
    parent: divIngredients,
  });
  for (let ingredient of recipe.ingredients) {
    let amountString;
    let unitsString;
    let nameString = ingredient.name;
    
    let amount = ingredient.amount;
    let units = ingredient.units;
    
    let liDirection = newElem('LI', {
      parent: ulIngredients,
    });
  }
  
  // Create the directions.
  let divDirections = newElem('DIV', {
    classList: ['section'],
    parent: divContent,
  });
  let lblDirectionsHeader = newElem('H2', {
    innerText: 'Directions',
    parent: divDirections,
  });
  let ulDirections = newElem('OL', {
    parent: divDirections,
  });
  for (let direction of recipe.directions) {
    let liDirection = newElem('LI', {
      innerText: direction,
      parent: ulDirections,
    });
  }
}

function displayError() {
  document.title = '??? | Recipe Web App';
  lblTitle.innerText = '???';
  
  let label = newElem('DIV', {
    classList: ['main-error'],
    innerText: 'Error loading recipe',
    parent: divContent,
  });
}

function getRecipe(id) {
  ajaxGet('api/getrecipe.php', {
    args: {id: id,},
    on: {
      '200': (json) => {
        let data;
        
        try {
          data = JSON.parse(json);
        } catch (ex) {
          console.error(ex.message);
          console.log(json);
          displayError();
          return;
        }
        
        constructPage(data);
      },
      '400': () => {
        console.error(`Invalid request`);
        displayError();
      },
      '404': () => {
        console.error(`Recipe #${id} does not exist`);
        displayError();
      },
      '500': () => {
        console.error(`Error loading recipe #${id}`);
        displayError();
      },
    },
  });
}

window.addEventListener('load', () => {
  let id = new URLSearchParams(window.location.search).get('id');
  getRecipe(id);
});