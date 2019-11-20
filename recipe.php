<!DOCTYPE html>

<?php
$recipeId = null;
if (isset($_GET["id"])) {
   $recipeId = $_GET["id"];
}

require("views/topbar.php");
require("models/recipemgmt.php");

$message = null;
$recipe = null;

if ($recipeId === null) {
  $message = "<p>No recipe specified</p>";
} else {
  try {
    $recipe = getRecipe($recipeId);
  } catch (FileNotFoundException $fnfex) {
    $message = "<p>Cannot find recipe $recipeId</p>";
  } catch (FileReadException $frex) {
    $message = "<p>Error reading recipe $recipeId</p>";
  } catch (DecodeException $dex) {
    $message = "<p>Error parsing recipe $recipeId</p>";
  }
}
?>

<html>
  <head>
    <title><?php
    print ($recipe != null) ? $recipe->getTitle() : "???";
    ?> | Recipe Web App
    </title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="styles/top.css"/>
    <link rel="shortcut icon" type="image/png" href="assets/icons/recipe.png"/>
  </head>
  <body>
    <div class="wrapper">
      <?php
      $title = ($recipe != null) ? $recipe->getTitle() : "???";
      showTopBar("recipe", $title);
      ?>
      
      <div class="content">
        <?php
        if ($message != null):
          print($message);
        else:
        ?>
          
          
        <?php
        endif;
        ?>
      </div>
    </div>
  </body>
</html>

