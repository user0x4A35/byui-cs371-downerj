<?php
  $GLOBALS["RECIPE_DIR"] = "db/recipes";
  
  class RecipeDuration {
    private $hours;
    private $minutes;
    private $seconds;
    
    public function __construct(integer $hours, integer $minutes, integer $seconds) {
      $this->$hours = $hours;
      $this->$minutes = $minutes;
      $this->$seconds = $seconds;
    }
    
    public function getHours() {
      return $hours;
    }
    
    public function getMinutes() {
      return $minutes;
    }
    
    public function getSeconds() {
      return $seconds;
    }
  }
  
  class RecipeIngredient {
    private $name;
    private $units;
    private $amount;
    
    public function __construct(string $name, string $units, string $amount) {
      $this->$name = $name;
      $this->$units = $units;
      $this->$amount = $amount;
    }
    
    public function getName() {
      return $name;
    }
    
    public function getUnits() {
      return $units;
    }
    
    public function getAmount() {
      return $amount;
    }
  }
  
  class Recipe {
    private $title;
    private $prepTime;
    private $cookTime;
    private $yieldSize;
    private $nutritionInfo;
    private $ingredients;
    private $directions;
    
    public function __construct(array $data) {
      
    }
  }
  
  class FileNotFoundException extends Exception {
    public function __construct($message, $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
    
    public function __toString() {
      $class = __CLASS__;
      return "$class: [{$this->code}]: {$this->message}\n";
    }
  }
  
  class FileReadException extends Exception {
    public function __construct($message, $code = 0, Exception $previous = null) {
      parent::__construct($message, $code, $previous);
    }
    
    public function __toString() {
      $class = __CLASS__;
      return "$class: [{$this->code}]: {$this->message}\n";
    }
  }
  
  function getRecipeIds() {
    $files = scandir($GLOBALS["RECIPE_DIR"]);
    
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
  
  function getRecipe($id) {
    $ids = getRecipeIds();
    
    $index = array_search($id, $ids);
    if ($index === false) {
      throw new FileNotFoundException("File not found: $id.json");
    }
    
    $dir = $GLOBALS["RECIPE_DIR"];
    $json = file_get_contents("$dir/$id.json");
    if ($json === false) {
      throw new FileReadException("Error reading file: $id.json");
    }
    
    return json_decode($json);
  }
?>
