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
  
  function addClasses(classes) {
    for (let className of classes) {
      element.classList.add(className);
    }
  }
  
  for (let attribute in kwargs) {
    let value = kwargs[attribute];
    
    switch (attribute) {
      case 'children':
        addChildren(value);
        break;
      
      case 'classList':
        addClasses(value);
        break;
      
      case 'parent':
        value.appendChild(element);
        break;
      
      default:
        element[attribute] = value;
    }
  }
  
  return element;
}
