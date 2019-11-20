<?php
  if (!isset($_GET["id"])) {
    header("HTTP/1.0 400 Bad Request");
    exit();
  }
  
  $id = $_GET["id"];
  
  require("models/recipemgmt.php");
  try {
    $json = getRecipe($id);
  } catch (FileNotFoundException $fnfex) {
    header("HTTP/1.0 404 Not Found");
    exit();
  } catch (FileReadException $frex) {
    header("HTTP/1.0 500 Internal Server Error");
    exit();
  }
  
  header("HTTP/1.0 200 OK");
  print($json);
?>
