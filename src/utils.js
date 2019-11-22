function elemById(id) {
  return document.getElementById(id);
}

function elemsByClass(className) {
  return [...document.getElementsByClassName(className)];
}

function makeFractionHtml(amount) {
  let integerString = '';
  if (amount.integer > 0) {
    integerString += `${amount.integer}`;
  }
  let fractionString = '';
  if ((amount.numeratorSimple > 0) && (amount.denominator > 1)) {
    fractionString = `<sup>${amount.numeratorSimple}</sup>&frasl;<sub>${amount.denominator}</sub>`;
    fractionString += '&nbsp;';
  } else if (amount.integer > 0) {
    fractionString += '&nbsp;';
  }
  return `${integerString}${fractionString}`;
}
