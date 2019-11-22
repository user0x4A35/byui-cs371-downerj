<!DOCTYPE html>

<?php
require("views/topbar.php");
require("models/recipemgmt.php");
$GLOBALS["RECIPE_DIR"] = "db/recipes";

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
    <?php require("views/meta.php"); ?>
  </head>
  <body>
    <div class="wrapper">
      <?php showTopBar("recipe"); ?>
      
      <div class="content" id="divContent">
        <h1 id="h1Title" hidden></h1>
        
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
            <li>
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
                <option value="default">Default</option>
                <option value="third">1/3&times;</option>
                <option value="half">1/2&times;</option>
                <option value="double">2&times;</option>
                <option value="triple">3&times;</option>
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
    
    <script src="src/ajax.js"></script>
    <script src="src/rational.js"></script>
    <script src="src/recipe.js"></script>
    <script src="src/utils.js"></script>
    <script src="src/recipemgmt.js"></script>
  </body>
</html>

