<?php
function showTopBar($type) {
?>
<div class="button menu-button" id="bt-menu">
  <img src="assets/icons/hamburger.png" width="40" height="40"/>
</div>

<div class="top-bar">
  <div class="menu-bar" hidden>
  </div>
  
  <?php
    if ($type == "search"):
  ?>
  <div class="button top-bar-button" id="bt-search">
    <img src="assets/icons/search.png" width="40" height="40"/>
  </div>
  <?php
    elseif ($type == "recipe"):
  ?>
  <div class="button top-bar-button" id="bt-home">
    <img src="assets/icons/home.png" width="40" height="40"/>
  </div>
  <?php
    endif;
  ?>
</div>

<div class="button account-button" id="bt-account">
  <img src="assets/icons/user.png" width="40" height="40"/>
</div>
<?php
}
?>

