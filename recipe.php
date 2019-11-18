<!DOCTYPE html>

<?php
  $recipeId = $_GET["id"];
  $root = __DIR__;
  
  require("$root/views/topbar.php");
  require("$root/models/recipemgmt.php");
?>

<html>
  <head>
    <title>Recipe Web App</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="styles/top.css"/>
  </head>
  <body>
    <div class="wrapper">
      <?php
        
        showTopBar("recipe");
      ?>
      
      <div class="content">
        <?php
          if (!isSet($recipeId)) {
            print("<p>Error loading recipe</p>");
          }
          
          try {
            $recipe = getRecipe($recipeId);
            var_dump($recipe);
          } catch (FileNotFoundException $fnfex) {
            print("Cannot find recipe $recipeId");
          } catch (FileReadException $frex) {
            print("Error reading recipe $recipeId");
          }
        ?>
      </div>
    </div>
  </body>
</html>

