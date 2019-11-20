function ajaxGet(resource, kwargs) {
  let req = new XMLHttpRequest();
  
  if ('args' in kwargs) {
    if (resource.charAt(resource.length - 1) != '?') {
      resource += '?';
    }
    
    for (let key in kwargs.args) {
      let value = encodeURIComponent(kwargs.args[key]);
      key = encodeURIComponent(key);
      
      resource += `${key}=${value}&`;
    }
  }
  
  req.addEventListener('readystatechange', () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if ('on' in kwargs) {
        let status = `${req.status}`;
        if (status in kwargs.on) {
          kwargs.on[status](req.response);
        }
      }
    }
  });
  
  req.open('GET', resource);
  req.send();
}
