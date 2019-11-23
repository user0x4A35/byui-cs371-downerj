const MAX_RECENTS = 10;

let divNewest;

function createRecipeLink(info) {
  let imageString;
  if (info.imageUrl) {
    imageString = `<img src="${info.imageUrl}" alt="${info.name}"/>`;
  } else {
    imageString = 'No image available.';
  }
  
  return `
  <div class="recipe-link">
    <a href="recipe.php?id=${info.id}">
      <div class="link-image">
        ${imageString}
      </div>
      <div class="link-name">
        ${info.name}
      </div>
    </a>
  </div>
  `;
}

function populateNewest(data) {
  let idsNewest = Object.keys(data).sort((lhs, rhs) => {
    if (lhs.dateAdded > rhs.dateAdded) {
      return 1;
    } else if (lhs.dateAdded < rhs.dateAdded) {
      return -1;
    } else {
      return 0;
    }
  });
  
  let recipesNewest = []
  idsNewest.forEach((id) => {
    recipesNewest.push(data[id]);
  });
  
  for (let r = 0; r < recipesNewest.length && r < MAX_RECENTS; r++) {
    let info = recipesNewest[r];
    divNewest.innerHTML += createRecipeLink(info);
  }
}

function getRecipes() {
  ajaxGet('api/lookuprecipes.php', {
    on: {
      '200': (json) => {
        let data = JSON.parse(json);
        
        populateNewest(data);
      },
    },
  });
}

window.addEventListener('load', () => {
  divNewest = elemById('divNewest');
  
  getRecipes();
});
