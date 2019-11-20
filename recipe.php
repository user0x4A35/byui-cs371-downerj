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
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="styles/top.css"/>
    <link rel="shortcut icon" type="image/png" href="assets/icons/recipe.png"/>
  </head>
  <body>
    <div class="wrapper">
      <?php
      showTopBar("recipe");
      ?>
      
      <div class="content">
      </div>
    </div>
    
    <script src="ajax.js"></script>
    <script src="rational.js"></script>
    <script src="recipe.js"></script>
    <script src="recipemgmt.js"></script>
  </body>
</html>

