<!DOCTYPE html>

<?php
$recipeId = null;
if (isset($_GET["id"])) {
   $recipeId = $_GET["id"];
}

require("views/topbar.php");
?>

<html>
  <head>
    <title></title>
    <?php require("views/meta.php"); ?>
  </head>
  <body>
    <div class="wrapper">
      <?php
      showTopBar("recipe");
      ?>
      
      <div class="content" id="divContent">
        <h1 id="h1Title" hidden></h1>
        
        <div class="section no-padding" id="divImage" hidden>
        </div>
        
        <div class="section" id="divSummary" hidden>
          <h2>Summary</h2>
          <hr/>
          <ul>
            <li><strong>Prep Time</strong>: <label id="lblPrepTime"></label></li>
            <li><strong>Cook Time</strong>: <label id="lblCookTime"></label></li>
            <li><strong>Total Time</strong>: <label id="lblTotalTime"></label></li>
            <li><strong>Yield Size</strong>: <label id="lblYieldSize"></label></li>
            <li><strong>Yield Scale</strong>:
              <select id="selYieldScale">
                <option value="default">Default</option>
                <option value="third">1/3&times;</option>
                <option value="half">1/2&times;</option>
                <option value="double">2&times;</option>
                <option value="triple">3&times;</option>
              </select>
            </li>
            <li><strong>Allergy Info</strong>: <label id="lblAllergyInfo"></label></li>
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
          <h2>Directions</h2>
          <hr/>
          <div id="divDirectionsList"></div>
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

