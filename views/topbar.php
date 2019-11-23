<?php
function showTopBar() {
?>
<div class="menu" id="divMenu">
  <a href="/index.php">Home</a>
</div>
<div class="button menu-button" id="btMenu">
  <img src="assets/icons/hamburger.png" width="40" height="40"/>
</div>

<div class="top-bar">
  <div class="menu-bar" hidden>
  </div>
  
  <label class="title" id="lblTitle">Recipe Web App</label>
</div>

<div class="button account-button" id="btAccount">
  <img src="assets/icons/user.png" width="40" height="40"/>
</div>

<script src="src/topbar.js"></script>
<?php } ?>

