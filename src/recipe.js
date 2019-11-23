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
  
  get value() {
    return this._hours * 60 + this._minutes;
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
  
  clone() {
    return new RecipeDuration(
      this._hours,
      this._minutes
    );
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
  
  set amount(value) {
    this._amount = value;
  }
  
  clone() {
    return new RecipeIngredient(
      this._name,
      this._units,
      this._amount.clone()
    );
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
  
  set amount(value) {
    this._amount = value;
  }
  
  clone() {
    return new RecipeYieldSize(
      this._units,
      this._amount.clone()
    );
  }
}

class Recipe {
  constructor(data) {
    this._title = data.title;
    this._imageUrl = data.imageUrl;
    this._addedBy = data.addedBy;
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
      new Rational(
        data.summary.yieldSize[1][0],
        data.summary.yieldSize[1][1]
      ),
    );
    this._allergyInfo = data.summary.allergyInfo.slice();
    this._notes = data.summary.notes.slice();
    
    this._ingredients = [];
    for (let arr of data.ingredients) {
      let name = arr[0];
      let units = arr[1];
      let numerator = arr[2][0];
      let denominator = arr[2][1] || 1;
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
  
  get addedBy() {
    return this._addedBy;
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
  
  get ingredientsCopy() {
    let copy = [];
    for (let ingredient of this._ingredients) {
      copy.push(ingredient.clone());
    }
    return copy;
  }
  
  get directions() {
    return this._directions;
  }
}
