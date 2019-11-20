<!DOCTYPE html>
<html>
  <head>
    <title>Home | Recipe Web App</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="styles/top.css"/>
    <link rel="shortcut icon" type="image/png" href="assets/icons/recipe.png"/>
  </head>
  <body>
    <div class="wrapper">
      <?php
        require("views/topbar.php");
        showTopBar("search", "Home");
      ?>
    </div>
  </body>
</html>

