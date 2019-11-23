const MAX_RECENTS = 10;

function getRecipes() {
  ajaxGet('api/lookuprecipes.php', {
    on: {
      '200': (json) => {
        let data = JSON.parse(json);
        
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
      },
    },
  });
}

window.addEventListener('load', () => {
  getRecipes();
});
