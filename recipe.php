<!DOCTYPE html>

<?php
  $recipeID = $_GET["id"];
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
        require("views/topbar.php");
        showTopBar("recipe");
      ?>
      
      <div class="content">
        <?php
          if (!isSet($recipeID)) {
            print("<p>Error loading recipe</p>");
          }
        ?>
      </div>
    </div>
  </body>
</html>

