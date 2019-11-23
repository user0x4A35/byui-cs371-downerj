<!DOCTYPE html>
<?php
  require("views/topbar.php");
  require("views/meta.php");
?>

<html>
  <head>
    <title>Home | Recipe Web App</title>
    <?php getMeta("Recipe Web App"); ?>
    
    <script src="src/ajax.js"></script>
    <script src="src/utils.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <?php showTopBar(); ?>
      
      <div class="content">
        <div class="homepage-section">
          <h2>Recently Added</h2>
          <div class="scroll-horiz" id="divNewest"></div>
        </div>
      </div>
    </div>
    
    <script src="src/home.js"></script>
  </body>
</html>

