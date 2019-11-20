function ajaxGet(resource, kwargs) {
  let req = new XMLHttpRequest();
  
  req.addEventListener('readystatechange', () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if ('on' in kwargs) {
        let status = `${req.status}`;
        if (status in kwargs.on) {
          kwargs.on[status]();
        }
      }
    }
  });
  
  req.open('GET', resource);
  req.send();
}
