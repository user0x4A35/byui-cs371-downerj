const RECIPE_DIR = "db/recipes";

let divContent;
let h1Title;
let divImage;
let divSummary;
let lblPrepTime;
let lblCookTime;
let lblTotalTime;
let lblYieldSize;
let lblAllergyInfo;
let selYieldScale;
let divNotes;
let ulNotes;
let divIngredients;
let divIngredientsList;
let divDirections;
let divDirectionsList;

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  
  // Create the recipe object.
  let recipe = new Recipe(data);
  
  // Add the title.
  h1Title.innerText = recipe.title;
  h1Title.hidden = false;
  
  // Create the image.
  let imageUrl = recipe.imageUrl;
  if (imageUrl) {
    divImage.innerHTML = `
      <img src="${imageUrl}" alt="${data.title}" class="image-fill"/>
    `;
  } else {
    divImage.classList.remove('no-padding');
    divImage.innerText = 'No image available.';
  }
  divImage.hidden = false;
  
  // Create the summary.
  let prepTime = recipe.prepTime;
  let prepHoursString = (prepTime.hours > 0) ? `${prepTime.hours} hr` : '';
  let prepMinutesString = (prepTime.minutes > 0) ? ` ${prepTime.minutes} min` : '';
  let prepTimeString = `${prepHoursString}${prepMinutesString}`;
  lblPrepTime.innerText = prepTimeString;
  
  let cookTime = recipe.cookTime;
  let cookHoursString = (cookTime.hours > 0) ? `${cookTime.hours} hr` : '';
  let cookMinutesString = (cookTime.minutes > 0) ? ` ${cookTime.minutes} min` : '';
  let cookTimeString = `${cookHoursString}${cookMinutesString}`;
  lblCookTime.innerText = cookTimeString;
  
  let totalTime = recipe.prepTime.add(recipe.cookTime);
  let totalHoursString = (totalTime.hours > 0) ? `${totalTime.hours} hr` : '';
  let totalMinutesString = (totalTime.minutes > 0) ? ` ${totalTime.minutes} min` : '';
  let totalTimeString = `${totalHoursString}${totalMinutesString}`;
  lblTotalTime.innerText = totalTimeString;
  
  let yieldSize = recipe.yieldSize;
  let yieldSizeString = `${yieldSize.amount} ${yieldSize.units}`;
  lblYieldSize.innerText = yieldSizeString;
  
  let allergyInfoString = '';
  if (recipe.allergyInfo.length > 0) {
    recipe.allergyInfo.forEach((allergen, index) => {
      allergyInfoString += `${allergen}${(index < recipe.allergyInfo.length - 1) ? ', ' : ''}`;
    });
  } else {
    allergyInfoString = 'None';
  }
  lblAllergyInfo.innerText = allergyInfoString;
  
  divSummary.hidden = false;
  
  // Create the notes, if there are any.
  let notes = recipe.notes;
  if (notes.length > 0) {
    let notesHtml = '';
    
    for (let note of notes) {
      notesHtml += `
        <li>${note}</li>
      `;
    }
    
    divNotes.hidden = false;
    ulNotes.innerHTML = notesHtml;
  }
  
  // Create the ingredients.
  let ingredientsHtml = '';
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
      fractionString += '&nbsp;';
    } else if (amount.integer > 0) {
      fractionString += '&nbsp;';
    }
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
    ingredientsHtml += `
    <div class="list-item">
      <div class="list-item-left">
        <label class="clickable">
          <input type="checkbox" hidden/>
          <div class="checkmark"></div>
        </label>
      </div>
      <div class="list-item-right">
        ${integerString}${fractionString}${unitsString}${nameString}
      </div>
    </div>`;
  }
  divIngredientsList.innerHTML = ingredientsHtml;
  divIngredients.hidden = false;
  
  // Create the directions.
  let directionsHtml = '';
  recipe.directions.forEach((direction, index) => {
    directionsHtml += `
    <div class="list-item">
      <div class="list-item-left">
        <label class="clickable">
          <input type="checkbox" hidden/>
          <div class="checkmark"></div>
        </label>
      </div>
      <div class="list-item-right">
        ${index + 1}. ${direction}
      </div>
    </div>`;
  });
  divDirectionsList.innerHTML = directionsHtml;
  divDirections.hidden = false;
}

function displayError() {
  document.title = '??? | Recipe Web App';
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
  divContent = elemById('divContent');
  h1Title = elemById('h1Title');
  divImage = elemById('divImage');
  divSummary = elemById('divSummary');
  lblPrepTime = elemById('lblPrepTime');
  lblCookTime = elemById('lblCookTime');
  lblTotalTime = elemById('lblTotalTime');
  lblYieldSize = elemById('lblYieldSize');
  lblAllergyInfo = elemById('lblAllergyInfo');
  selYieldScale = elemById('selYieldScale');
  divNotes = elemById('divNotes');
  ulNotes = elemById('ulNotes');
  divIngredients = elemById('divIngredients');
  divIngredientsList = elemById('divIngredientsList');
  divDirections = elemById('divDirections');
  divDirectionsList = elemById('divDirectionsList');
  
  let id = new URLSearchParams(window.location.search).get('id');
  getRecipe(id);
});

