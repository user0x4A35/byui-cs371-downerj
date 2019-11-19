<?php
  $GLOBALS["RECIPE_DIR"] = "db/recipes";
  
  /**
   *
   */
  class Rational {
    private $numerator;
    private $denominator = 1;
    
    public function __construct($numerator, $denominator) {
      $this->numerator = $numerator;
      $this->denominator = $denominator;
      
      $this->simplify();
    }
    
    public function getInteger() {
      return floor($this->numerator / $this->denominator);
    }
    
    public function getNumeratorActual() {
      return $this->numerator;
    }
    
    public function getNumerator() {
      try {
        return $this->numerator % $this->denominator;
      } catch (DivisionByZeroError $dbzex) {
        return null;
      }
    }
    
    public function getDenominator() {
      return $this->denominator;
    }
    
    public function getValue() {
      return $this->numerator / $this->denominator;
    }
    
    public function divide($ratio) {
      return new Rational($this->numerator, $this->denominator * $ratio);
    }
    
    public function multiply($ratio) {
      return new Rational($this->numerator * $ratio, $this->denominator);
    }
    
    private function simplify() {
      // ignore if 0 or 1
      if ($this->denominator < 2) {
        return;
      }
      
      // find LCD
      $min = min($this->numerator, $this->denominator);
      for ($factor = 2; $factor <= $min; $factor++) {
        while (($this->numerator % $factor === 0) && ($this->denominator % $factor === 0)) {
          $this->numerator /= $factor;
          $this->denominator /= $factor;
        }
      }
    }
  }
  
  /**
   *
   */
  class RecipeDuration {
    private $hours;
    private $minutes;
    
    public function __construct($hours, $minutes) {
      $this->hours = $hours;
      $this->minutes = $minutes;
      
      $this->simplify();
    }
    
    public function getHours() {
      return $this->hours;
    }
    
    public function getMinutes() {
      return $this->minutes;
    }
    
    public function add(RecipeDuration $value) {
      $hours = $this->hours + $value->hours;
      $minutes = $this->minutes + $value->minutes;
      
      return new RecipeDuration($hours, $minutes);
    }
    
    private function simplify() {
      $this->hours += floor($this->minutes / 60);
      $this->minutes %= 60;
    }
  }
  
  /**
   *
   */
  class RecipeIngredient {
    private $name;
    private $units;
    private $amount;
    
    public function __construct($name, $units, $amount) {
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
  
  class RecipeYieldSize {
    private $units;
    private $amount;
    
    public function __construct($units, $amount) {
      $this->units = $units;
      $this->amount = $amount;
    }
    
    public function getUnits() {
      return $units;
    }
    
    public function getAmount() {
      return $amount;
    }
  }
  
  /**
   *
   */
  class Recipe {
    private $title;
    private $prepTime;
    private $cookTime;
    private $yieldSize;
    private $allergyInfo;
    private $ingredients;
    private $directions;
    
    public function __construct($data) {
      $this->title = $data["title"];
      
    }
  }
  
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
  
  /**
   *
   */
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
