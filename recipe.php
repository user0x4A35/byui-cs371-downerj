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
      </div>
    </div>
    
    <script src="src/utils.js"></script>
    <script src="src/ajax.js"></script>
    <script src="src/rational.js"></script>
    <script src="src/recipe.js"></script>
    <script src="src/recipemgmt.js"></script>
  </body>
</html>

