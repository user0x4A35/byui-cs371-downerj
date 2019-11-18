<!DOCTYPE html>

<?php
  $recipeId = $_GET["id"];
  $root = __DIR__;
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
        require("$root/views/topbar.php");
        showTopBar("recipe");
      ?>
      
      <div class="content">
        <?php
          if (!isSet($recipeId)) {
            print("<p>Error loading recipe</p>");
          }
          
          include("$root/models/recipemgmt.php");
          $ids = getRecipeIds();
          foreach ($ids as $id) {
            print("$id<br/>");
          }
        ?>
      </div>
    </div>
  </body>
</html>

