const RECIPE_DIR = "db/recipes";

let lblTitle = document.getElementById('lblTitle');
let divContent = document.getElementById('divContent');

function constructPage(data) {
  document.title = `${data.title} | Recipe Web App`;
  lblTitle.innerText = data.title;
  
  let recipe = new Recipe(data);
  
  
}

function displayError() {
  let label = document.createElement('DIV');
  label.classList.add('main-error');
  label.innerText = 'Error loading recipe';
  divContent.appendChild(label);
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