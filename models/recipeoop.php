<?php
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
  
  public function __toString() {
    $numer = $this->numerator;
    $denom = $this->denominator;
    return "${numer}/${denom}";
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
    return $this->name;
  }
  
  public function getUnits() {
    return $this->units;
  }
  
  public function getAmount() {
    return $this->amount;
  }
}

/**
 *
 */
class RecipeYieldSize {
  private $units;
  private $amount;
  
  public function __construct($units, $amount) {
    $this->units = $units;
    $this->amount = $amount;
  }
  
  public function getUnits() {
    return $this->units;
  }
  
  public function getAmount() {
    return $this->amount;
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
  private $ingredients = [];
  private $directions = [];
  
  public function __construct($data) {
    $this->title = $data->title;
    $this->prepTime = new RecipeDuration(
      $data->summary->prepTime[0],
      $data->summary->prepTime[1]
    );
    $this->cookTime = new RecipeDuration(
      $data->summary->cookTime[0],
      $data->summary->cookTime[1]
    );
    $this->yieldSize = new RecipeYieldSize(
      $data->summary->yieldSize[0],
      $data->summary->yieldSize[1]
    );
    $this->allergyInfo = $data->summary->allergyInfo;
    
    foreach ($data->ingredients as $arr) {
      $numer = 1;
      $denom = 1;
      
      $amount = $arr[2];
      if (is_array($amount)) {
        $numer = $amount[0];
        $denom = $amount[1];
      } else {
        $numer = $amount;
      }
      
      $ingredient = new RecipeIngredient(
        $arr[0],
        $arr[1],
        new Rational($numer, $denom)
      );
      
      array_push($this->ingredients, $ingredient);
    }
    
    $this->directions = $data->directions;
  }
  
  public function getTitle() {
    return $this->title;
  }
  
  public function getPrepTime() {
    return $this->prepTime;
  }
  
  public function getCookTime() {
    return $this->cookTime;
  }
  
  public function getYieldSize() {
    return $this->yieldSize;
  }
  
  public function getAllergyInfo() {
    return $this->allergyInfo;
  }
  
  public function getIngredients() {
    return $this->ingredients;
  }
  
  public function getDirections() {
    return $this->directions;
  }
}
?>
