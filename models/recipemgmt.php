<?php
  $GLOBALS["DB_DIR"] = "../db";
  $GLOBALS["RECIPE_DIR"] = "../db/recipes";
  
  /**
   *
   */
  class FileNotFoundException extends Exception {
    public function __construct($message, $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
    
    public function __toString() {
      $class = __CLASS__;
      return "$class: [{$this->code}]: {$this->message}\n";
    }
  }
  
  /**
   *
   */
  class FileReadException extends Exception {
    public function __construct($message, $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
    
    public function __toString() {
      $class = __CLASS__;
      return "$class: [{$this->code}]: {$this->message}\n";
    }
  }
  
  /**
   *
   */
  function getRecipeIds($dir) {
    $files = scandir($dir);
    
    // remove "." and ".." by selecting everything from index 2 and on
    $files = array_splice($files, 2);
    
    $ids = [];
    
    foreach ($files as $index => $file) {
      // add ID if the extension is ".json"
      $extension = substr($file, strlen($file) - 5, 5);
      if ($extension === ".json") {
        $recipeId = substr($file, 0, strlen($file) - 5);
        array_push($ids, $recipeId);
      }
    }
    
    return $ids;
  }
  
  /**
   *
   */
  function lookupRecipes($dir) {
    $json = file_get_contents("$dir/lookup.json");
    if ($json === false) {
      throw new FileReadException("Error reading file: $id.json");
    }
    
    return $json;
  }
  
  /**
   *
   */
  function getRecipe($id, $dir) {
    $ids = getRecipeIds($dir);
    
    $index = array_search($id, $ids);
    if ($index === false) {
      throw new FileNotFoundException("File not found: $id.json");
    }
    
    $json = file_get_contents("$dir/$id.json");
    if ($json === false) {
      throw new FileReadException("Error reading file: $id.json");
    }
    
    return $json;
  }
?>
