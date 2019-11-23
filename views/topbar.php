<?php
function showTopBar() {
?>
<div class="menu" id="divMenu">
  <div class="menu-section">
    <h2>Quick Links</h2>
    <a href="/index.php">
    <div class="menu-link-button">
      <div class="menu-link">
        Home
      </div>
      <div class="menu-button-icon">
        <img src="/assets/icons/home.png" width="30" height="30"/>
      </div>
    </div>
    </a>
    
    <a href="#">
    <div class="menu-link-button">
      <div class="menu-link">
        Account
      </div>
      <div class="menu-button-icon">
        <img src="/assets/icons/user.png" width="30" height="30"/>
      </div>
    </div>
    </a>
    
    <a href="#">
    <div class="menu-link-button">
      <div class="menu-link">
        Search
      </div>
      <div class="menu-button-icon">
        <img src="/assets/icons/search.png" width="30" height="30"/>
      </div>
    </div>
    </a>
  </div>
</div>

<div class="button menu-button" id="btMenu">
  <img src="/assets/icons/hamburger.png" width="40" height="40"/>
</div>

<div class="menu-shade" id="divMenuShade" hidden></div>

<div class="top-bar">
  <div class="menu-bar" hidden>
  </div>
  
  <label class="title" id="lblTitle">Recipe Web App</label>
</div>

<script src="/src/topbar.js"></script>
<?php } ?>

