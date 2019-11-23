<!DOCTYPE html>
<?php
  require("views/topbar.php");
  require("views/meta.php");
?>

<html>
  <head>
    <title>Home | Recipe Web App</title>
    <?php getMeta($pageTitle); ?>
  </head>
  <body>
    <div class="wrapper">
      <?php showTopBar("home"); ?>
    </div>
  </body>
</html>

