const RECIPE_DIR = "db/recipes";

let lblTitle = elemById('lblTitle');
let divContent = elemById('divContent');

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  lblTitle.innerText = data.title;
  
  // Create the recipe object.
  let recipe = new Recipe(data);
  
  // Create the summary.
  let prepTime = recipe.prepTime;
  let prepHoursString = (prepTime.hours > 0) ? `${prepTime.hours} hr` : '';
  let prepMinutesString = (prepTime.minutes > 0) ? ` ${prepTime.minutes} min` : '';
  let prepTimeString = `${prepHoursString}${prepMinutesString}`;
  
  let cookTime = recipe.cookTime;
  let cookHoursString = (cookTime.hours > 0) ? `${cookTime.hours} hr` : '';
  let cookMinutesString = (cookTime.minutes > 0) ? ` ${cookTime.minutes} min` : '';
  let cookTimeString = `${cookHoursString}${cookMinutesString}`;
  
  let totalTime = recipe.prepTime.add(recipe.cookTime);
  let totalHoursString = (totalTime.hours > 0) ? `${totalTime.hours} hr` : '';
  let totalMinutesString = (totalTime.minutes > 0) ? ` ${totalTime.minutes} min` : '';
  let totalTimeString = `${totalHoursString}${totalMinutesString}`;
  
  let yieldSize = recipe.yieldSize;
  let yieldSizeString = `${yieldSize.amount} ${yieldSize.units}`;
  
  let allergyInfoString = '';
  if (recipe.allergyInfo.length > 0) {
    recipe.allergyInfo.forEach((allergen, index) => {
      allergyInfoString += `${allergen}${(index < recipe.allergyInfo.length - 1) ? ', ' : ''}`;
    });
  } else {
    allergyInfoString = 'None';
  }
  
  divContent.innerHTML += `
  <div class="section">
    <h2>Summary</h2>
    <ul>
      <li><strong>Prep Time</strong>: ${prepTimeString}</li>
      <li><strong>Cook Time</strong>: ${cookTimeString}</li>
      <li><strong>Total Time</strong>: ${totalTimeString}</li>
      <li><strong>Yield Size</strong>: ${yieldSizeString}</li>
      <li><strong>Allergy Info</strong>: ${allergyInfoString}</li>
    </ul>
  </div>
  `;
  
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
      fractionString = `<sup>${amount.numeratorSimple}</sup>&frasl;<sub>${amount.denominator}</sub>`;
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
    <li>
    <label class="clickable">
    <input type="checkbox" hidden/>
    <div class="checkmark"></div>
    ${integerString}${fractionString}${unitsString}${nameString}
    </label>
    </li>`;
  }
  
  divContent.innerHTML += `
  <div class="section">
    <h2>Ingredients</h2>
    <ul class="no-bullets">${ingredientsString}</ul>
  </div>
  `;
  
  // Create the directions.
  let directionsString = '';
  recipe.directions.forEach((direction, index) => {
    directionsString += `
    <li>
    <label class="clickable">
    <input type="checkbox" hidden/>
    <div class="checkmark"></div>
    ${index + 1}. ${direction}
    </label>
    </li>`;
  });
  
  divContent.innerHTML += `
  <div class="section">
    <h2>Directions</h2>
    <ol class="no-bullets">${directionsString}</ol>
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
