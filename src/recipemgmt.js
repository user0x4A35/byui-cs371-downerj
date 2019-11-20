const RECIPE_DIR = "db/recipes";

let lblTitle = elemById('lblTitle');
let divContent = elemById('divContent');

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  lblTitle.innerText = data.title;
  
  let recipe = new Recipe(data);
  
  let ulDirections = newElem('UL', {
    'parent': divContent,
  });
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