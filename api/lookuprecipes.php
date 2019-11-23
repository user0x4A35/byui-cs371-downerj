<?php
  $dbDir = "../db";
  
  require("../models/recipemgmt.php");
  try {
    $json = lookupRecipes($dbDir);
  } catch (FileReadException $frex) {
    header("HTTP/1.0 500 Internal Server Error");
    exit;
  }
  
  header("HTTP/1.0 200 OK");
  print($json);
?>
