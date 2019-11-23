let divContent;
let divTitles;
let lblRecipeTitle;
let lblAddedBy;
let divImage;
let divSummary;
let lblPrepTime;
let liCookTime;
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

function fillTitle(recipe) {
  lblRecipeTitle.innerText = recipe.title;
  lblAddedBy.innerText = recipe.addedBy || "Anonymous";
  divTitles.hidden = false;
}

function fillImage(recipe) {
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
}

function fillPrepTime(recipe) {
  let prepTime = recipe.prepTime;
  let prepHoursString = (prepTime.hours > 0) ? `${prepTime.hours} hr` : '';
  let prepMinutesString = (prepTime.minutes > 0) ? ` ${prepTime.minutes} min` : '';
  lblPrepTime.innerText = `${prepHoursString}${prepMinutesString}`;
}

function fillCookTime(recipe) {
  let cookTime = recipe.cookTime;
  if (cookTime.value > 0) {
    let cookHoursString = (cookTime.hours > 0) ? `${cookTime.hours} hr` : '';
    let cookMinutesString = (cookTime.minutes > 0) ? ` ${cookTime.minutes} min` : '';
    lblCookTime.innerText = `${cookHoursString}${cookMinutesString}`;
  } else {
    liCookTime.hidden = true;
  }
}

function fillTotalTime(recipe) {
  let totalTime = recipe.prepTime.add(recipe.cookTime);
  let totalHoursString = (totalTime.hours > 0) ? `${totalTime.hours} hr` : '';
  let totalMinutesString = (totalTime.minutes > 0) ? ` ${totalTime.minutes} min` : '';
  lblTotalTime.innerText = `${totalHoursString}${totalMinutesString}`;
}

function fillYieldSize(recipe) {
  let yieldSize = recipe.yieldSize;
  let amountString = makeFractionHtml(yieldSize.amount);
  lblYieldSize.innerHTML = `${amountString}${yieldSize.units}`;
}

function fillAllergyInfo(recipe) {
  let allergyInfoString = '';
  if (recipe.allergyInfo.length > 0) {
    recipe.allergyInfo.forEach((allergen, index) => {
      allergyInfoString += `${allergen}${(index < recipe.allergyInfo.length - 1) ? ', ' : ''}`;
    });
  } else {
    allergyInfoString = 'None';
  }
  lblAllergyInfo.innerText = allergyInfoString;
}

function fillSummary(recipe) {
  fillPrepTime(recipe);
  fillCookTime(recipe);
  fillTotalTime(recipe);
  fillYieldSize(recipe);
  fillAllergyInfo(recipe);
  
  divSummary.hidden = false;
}

function fillNotes(recipe) {
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
}

const UNITS_PLURAL_ES = [
  'batch',
  'box',
];

const UNITS_PLURAL_S = [
  'cup',
  'pint',
  'clove',
  'packet',
  'stick',
  'block',
  'can',
];

function fillIngredients(recipe) {
  let ingredientsHtml = '';
  for (let ingredient of recipe.ingredients) {
    let name = ingredient.name;
    let amount = ingredient.amount;
    let units = ingredient.units;
    
    let amountString = makeFractionHtml(amount);
    
    let unitsString = '';
    if ((units !== 'ea') && (units !== '*')) {
      let pluralEs = '';
      if (amount.integer > 1) {
        // check "es"
        for (let unit of UNITS_PLURAL_ES) {
          if ((units.length >= unit.length) && (units.substr(units.length - unit.length) === unit)) {
            pluralEs = 'es';
          }
        }
        // check "s"
        for (let unit of UNITS_PLURAL_S) {
          if ((units.length >= unit.length) && (units.substr(units.length - unit.length) === unit)) {
            pluralEs = 's';
          }
        }
      }
      unitsString = `${units}${pluralEs} `;
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
        ${amountString}${unitsString}${nameString}
      </div>
    </div>`;
  }
  divIngredientsList.innerHTML = ingredientsHtml;
  divIngredients.hidden = false;
}

function fillDirections(recipe) {
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

function updateYieldScale(recipe) {
  let yieldSize = recipe.yieldSize.clone();
  let ingredients = recipe.ingredientsCopy;
  
  let daggers = elemsByClass('time-note-marker');
  let timeNote = elemById('lblTimeNote');
  
  switch (selYieldScale.value) {
    case 'third':
      yieldSize.amount = yieldSize.amount.divide(3);
      for (let ingredient of ingredients) {
        ingredient.amount = ingredient.amount.divide(3);
      }
      for (let dagger of daggers) {
        dagger.hidden = false;
      }
      timeNote.hidden = false;
      break;
    
    case 'half':
      yieldSize.amount = yieldSize.amount.divide(2);
      for (let ingredient of ingredients) {
        ingredient.amount = ingredient.amount.divide(2);
      }
      for (let dagger of daggers) {
        dagger.hidden = false;
      }
      timeNote.hidden = false;
      break;
    
    case 'double':
      yieldSize.amount = yieldSize.amount.multiply(2);
      for (let ingredient of ingredients) {
        ingredient.amount = ingredient.amount.multiply(2);
      }
      for (let dagger of daggers) {
        dagger.hidden = false;
      }
      timeNote.hidden = false;
      break;
    
    case 'triple':
      yieldSize.amount = yieldSize.amount.multiply(3);
      for (let ingredient of ingredients) {
        ingredient.amount = ingredient.amount.multiply(3);
      }
      for (let dagger of daggers) {
        dagger.hidden = false;
      }
      timeNote.hidden = false;
      break;
    
    default:
      for (let dagger of daggers) {
        dagger.hidden = true;
      }
      timeNote.hidden = true;
  }
  
  let mockRecipe = {
    yieldSize: yieldSize,
    ingredients: ingredients,
  };
  fillYieldSize(mockRecipe);
  fillIngredients(mockRecipe);
}

function constructPage(data) {
  // Create the recipe object.
  let recipe = new Recipe(data);
  
  // Fill in the rest of the page.
  fillTitle(recipe);
  fillImage(recipe);
  fillSummary(recipe);
  fillNotes(recipe);
  fillIngredients(recipe);
  fillDirections(recipe);
  
  selYieldScale.selectedIndex = 0;
  selYieldScale.addEventListener('input', () => {
    updateYieldScale(recipe)
  });
}

function displayError() {
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
  divTitles = elemById('divTitles');
  lblRecipeTitle = elemById('lblRecipeTitle');
  lblAddedBy = elemById('lblAddedBy');
  divImage = elemById('divImage');
  divSummary = elemById('divSummary');
  lblPrepTime = elemById('lblPrepTime');
  liCookTime = elemById('liCookTime');
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

