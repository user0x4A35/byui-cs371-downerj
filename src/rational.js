class Rational {
  constructor(numerator, denominator) {
    this._numerator = numerator;
    this._denominator = denominator;
    
    this._simplify();
  }
  
  get integer() {
    return Math.floor(this._numerator / this._denominator);
  }
  
  get numeratorSimple() {
    return this._numerator % this._denominator;
  }
  
  get numerator() {
    return this._numerator;
  }
  
  get denominator() {
    return this._denominator;
  }
  
  get value() {
    return this._numerator / this._denominator;
  }
  
  multiply(ratio) {
    return new Rational(this._numerator * ratio, this._denominator);
  }
  
  divide(ratio) {
    return new Rational(this._numerator, this._denominator * ratio);
  }
  
  _simplify() {
    // ignore if 0 or 1
    if (this._denominator < 2) {
      return;
    }
    
    // find LCD
    let minVal = Math.min(this._numerator, this._denominator);
    for (let factor = 2; factor <= minVal; factor++) {
      while((this._numerator % factor === 0) && (this._denominator % factor === 0)) {
        this._numerator = Math.floor(this._numerator / factor);
        this._denominator = Math.floor(this._denominator / factor);
      }
    }
  }
  
  clone() {
    return new Rational(
      this._numerator,
      this._denominator
    );
  }
}
