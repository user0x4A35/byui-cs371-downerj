<!DOCTYPE html>

<?php
$recipeId = null;
if (isset($_GET["id"])) {
   $recipeId = $_GET["id"];
}
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
        if ($recipeId === null) {
          print("<p>No recipe specified</p>");
        } else {
          try {
            $recipe = getRecipe($recipeId);
            //var_dump($recipe);
          } catch (FileNotFoundException $fnfex) {
            print("<p>Cannot find recipe $recipeId</p>");
          } catch (FileReadException $frex) {
            print("<p>Error reading recipe $recipeId</p>");
          } catch (DecodeException $dex) {
            print("<p>Error parsing recipe $recipeID</p>");
          }
        }
        ?>
      </div>
    </div>
  </body>
</html>

