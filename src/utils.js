function elemById(id) {
  return document.getElementById(id);
}

function newElem(tagName, kwargs) {
  let element = document.createElement(tagName);
  
  function addChildren(children) {
    for (let child of children) {
      element.appendChild(child);
    }
  }
  
  function addStyles(styles) {
    for (let attribute in styles) {
      element.style[attribute] = styles[attribute];
    }
  }
  
  function setAttributes(kwargs) {
    for (let attribtue in kwargs) {
      let value = kwargs[attribute];
      
      switch (attribute) {
        case 'style':
          addStyles(value);
          break;
        
        case 'children':
          addChildren(value);
          break;
        
        default:
          element[attribute] = value;
      }
    }
  }
  
  return element;
}
