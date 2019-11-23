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
      
      <div class="content">
        <div class="section">
          <h2>Recently Added</h2>
        </div>
      </div>
    </div>
  </body>
</html>

