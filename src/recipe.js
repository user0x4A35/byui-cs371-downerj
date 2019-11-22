class RecipeDuration {
  constructor(hours, minutes) {
    this._hours = hours;
    this._minutes = minutes;
    
    this._simplify();
  }
  
  get hours() {
    return this._hours;
  }
  
  get minutes() {
    return this._minutes;
  }
  
  add(duration) {
    let hours = this._hours + duration.hours;
    let minutes = this._minutes + duration.minutes;
    
    return new RecipeDuration(hours, minutes); 
  }
  
  _simplify() {
    this._hours += Math.floor(this.minutes / 60);
    this._minutes %= 60;
  }
}

class RecipeIngredient {
  constructor(name, units, amount) {
    this._name = name;
    this._units = units;
    this._amount = amount;
  }
  
  get name() {
    return this._name;
  }
  
  get units() {
    return this._units;
  }
  
  get amount() {
    return this._amount;
  }
}

class RecipeYieldSize {
  constructor(units, amount) {
    this._units = units;
    this._amount = amount; 
  }
  
  get units() {
    return this._units;
  }
  
  get amount() {
    return this._amount;
  }
}

class Recipe {
  constructor(data) {
    this._title = data.title;
    this._imageUrl = data.imageUrl;
    this._prepTime = new RecipeDuration(
      data.summary.prepTime[0],
      data.summary.prepTime[1]
    );
    this._cookTime = new RecipeDuration(
      data.summary.cookTime[0],
      data.summary.cookTime[1]
    );
    this._yieldSize = new RecipeYieldSize(
      data.summary.yieldSize[0],
      data.summary.yieldSize[1]
    );
    this._allergyInfo = data.summary.allergyInfo.slice();
    this._notes = data.summary.notes.slice();
    
    this._ingredients = [];
    for (let arr of data.ingredients) {
      let name = arr[0];
      let units = arr[1];
      let numerator = 1;
      let denominator = 1;
      
      if (arr[2] instanceof Array) {
        numerator = arr[2][0];
        denominator = arr[2][1];
      } else {
        numerator = arr[2];
      }
      
      let amount = new Rational(numerator, denominator);
      
      this._ingredients.push(new RecipeIngredient(name, units, amount));
    }
    
    this._directions = data.directions.slice();
  }
  
  get title() {
    return this._title;
  }
  
  get imageUrl() {
    return this._imageUrl;
  }
  
  get prepTime() {
    return this._prepTime;
  }
  
  get cookTime() {
    return this._cookTime;
  }
  
  get yieldSize() {
    return this._yieldSize;
  }
  
  get allergyInfo() {
    return this._allergyInfo;
  }
  
  get notes() {
    return this._notes;
  }
  
  get ingredients() {
    return this._ingredients;
  }
  
  get directions() {
    return this._directions;
  }
}
