<!DOCTYPE html>

<?php
require("views/topbar.php");
require("models/recipemgmt.php");
require("views/meta.php");

$recipeId = null;
$pageTitle = "Recipe Web App";
if (isset($_GET["id"])) {
  $recipeId = $_GET["id"];
  $recipeDir = "db/recipes";
  $data = null;
  
  try {
    $json = getRecipe($recipeId, $recipeDir);
    $data = json_decode($json);
  } catch (FileNotFoundException $fnfex) {
    $data = null;
  } catch (FileReadException $frex) {
    $data = null;
  }
  
  if ($data !== null) {
    $title = $data->{"title"};
    $pageTitle = "${title} | Recipe Web App";
  }
}
?>

<html>
  <head>
    <title><?php print($pageTitle); ?></title>
    <?php getMeta($pageTitle); ?>
    
    <script src="src/ajax.js"></script>
    <script src="src/rational.js"></script>
    <script src="src/recipe.js"></script>
    <script src="src/utils.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <?php showTopBar(); ?>
      
      <div class="content" id="divContent">
        <div class="titles" id="divTitles" hidden>
          <h1><label id="lblRecipeTitle"></label></h1>
          <h3>By&nbsp;<label id="lblAddedBy"></label></h3>
        </div>
        
        <div class="section no-padding" id="divImage" hidden>
        </div>
        
        <div class="section" id="divSummary" hidden>
          <h2>Summary</h2>
          <hr/>
          <ul>
            <li>
              <strong>Prep Time</strong><label class="time-note-marker" hidden><sup>&dagger;</sup></label>:
              <label id="lblPrepTime"></label>
            </li>
            <li id="liCookTime">
              <strong>Cook Time</strong><label class="time-note-marker" hidden><sup>&dagger;</sup></label>:
              <label id="lblCookTime"></label>
            </li>
            <li>
              <strong>Total Time</strong><label class="time-note-marker" hidden><sup>&dagger;</sup></label>:
              <label id="lblTotalTime"></label>
            </li>
            <li>
              <strong>Yield Size</strong>:
              <label id="lblYieldSize"></label>
            </li>
            <li>
              <strong>Yield Scale</strong>:
              <select id="selYieldScale">
                <option value="third">1/3&times; Recipe</option>
                <option value="half">1/2&times; Recipe</option>
                <option value="default">Default Recipe</option>
                <option value="double">2&times; Recipe</option>
                <option value="triple">3&times; Recipe</option>
              </select>
            </li>
            <li>
              <strong>Allergy Info</strong>:
              <label id="lblAllergyInfo"></label>
            </li>
          </ul>
        </div>
        
        <div class="section" id="divNotes" hidden>
          <h2>Notes</h2>
          <hr/>
          <ul id="ulNotes"></ul>
        </div>
        
        <div class="section" id="divIngredients" hidden>
          <h2>Ingredients</h2>
          <hr/>
          <div id="divIngredientsList"></div>
        </div>
        
        <div class="section" id="divDirections" hidden>
          <h2>Directions<label class="time-note-marker" hidden><sup>&dagger;</sup></h2></label>
          <hr/>
          <div id="divDirectionsList"></div>
        </div>
        
        <div class="section" id="lblTimeNote" hidden>
          <sup>&dagger;</sup>
          Prep and cook times may vary when scaling a recipe up or down.
        </div>
      </div>
    </div>
    
    <script src="src/recipemgmt.js"></script>
  </body>
</html>

