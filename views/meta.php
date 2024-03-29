<?php
/* TODO: Enable SSL locally
if (!isset($_SERVER["HTTPS"]) || $_SERVER["HTTPS"] !== "on") {
  $HOST = $_SERVER["HTTP_HOST"];
  $URI = $_SERVER["REQUEST_URI"];
  print("$HOST$URI");
  header("Location: https://$HOST$URI", true, 301);
  exit;
}
*/

function getMeta($title) {
?>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="og:title" content="<?php print($title); ?>"/>
  <meta name="og:image" content="https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg"/>
  <link rel="stylesheet" href="styles/top.css"/>
  <link rel="shortcut icon" type="image/png" href="assets/icons/recipe.png"/>
  <link rel="manifest" href="manifest.json"/>
<?php
}
?>
