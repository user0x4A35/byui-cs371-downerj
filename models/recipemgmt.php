<?php
  function getRecipeIds() {
    $files = scandir("db/recipes");
    
    // remove "." and ".." by selecting everything from index 2 and on
    $files = array_splice($files, 2);
    
    $ids = [];
    
    foreach ($files as $index => $file) {
      // add ID if the extension is ".json"
      $extension = substr($file, strlen($file) - 5, 5);
      if ($extension == ".json") {
        $recipeId = substr($file, 0, strlen($file) - 5);
        array_push($ids, $recipeId);
      }
    }
    
    return $ids;
  }
?>
