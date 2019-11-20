const RECIPE_DIR = "db/recipes";

let lblTitle = elemById('lblTitle');
let divContent = elemById('divContent');

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  lblTitle.innerText = data.title;
  
  let recipe = new Recipe(data);
  
  // Create the summary.
  
  // Create the ingredients.
  let ingredientsString = '';
  for (let ingredient of recipe.ingredients) {
    let name = ingredient.name;
    let amount = ingredient.amount;
    let units = ingredient.units;
    let integerString = '';
    if (amount.integer > 0) {
      integerString = `${amount.integer}`;
    }
    let fractionString = '';
    if ((amount.numeratorSimple > 0) && (amount.denominator > 1)) {
      fractionString = `
        <sup>${amount.numeratorSimple}</sup>&frasl;<sub>${amount.denominator}</sub>
      `;
    }
    fractionString += '&nbsp;';
    let unitsString = '';
    if ((units !== 'ea') && (units !== '*')) {
      let pluralEs = false;
      if (amount.value > 1) {
        if (units === 'cup') {
          pluralEs = true;
        }
      }
      unitsString = `${units}${(pluralEs) ? 's' : ''} `;
    }
    let nameString = ingredient.name;
    ingredientsString += `
      <li>${integerString}${fractionString}${unitsString}${nameString}</li>`;
  }
  
  divContent.innerHTML += `
  <div class="section">
    <h2>Ingredients</h2>
    <ul>${ingredientsString}</ul>
  </div>
  `;
  
  // Create the directions.
  let directionsString = '';
  for (let direction of recipe.directions) {
    directionsString += `<li>${direction}</li>`;
  }
  divContent.innerHTML += `
  <div class="section">
    <h2>Directions</h2>
    <ol>${directionsString}</ol>
  </div>
  `;
}

function displayError() {
  document.title = '??? | Recipe Web App';
  lblTitle.innerText = '???';
  divContent.innerHTML += `
  <div class="main-error">
    Error loading recipe
  </div>
  `;
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
