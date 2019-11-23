let divMenu;
let divMenuShade;
let btMenu;

let menuState = false;

function toggleMenu(state) {
  if (state !== null && state !== undefined) {
    menuState = state;
  } else {
    menuState = !menuState;
  }
  
  if (!menuState) {
    divMenu.style.left = `${0 - divMenu.offsetWidth}px`;
    btMenu.style.left = 0;
    divMenuShade.hidden = true;
  } else {
    // one-time visibility toggle
    divMenu.style.visibility = 'visible';
    
    divMenu.style.left = 0;
    btMenu.style.left = `${divMenu.offsetWidth - 1}px`;
    divMenuShade.hidden = false;
  }
}

window.addEventListener('load', () => {
  divMenu = elemById('divMenu');
  divMenuShade = elemById('divMenuShade');
  btMenu = elemById('btMenu');
  
  btMenu.addEventListener('click', () => {
    toggleMenu();
  });
  
  divMenuShade.addEventListener('click', () => {
    toggleMenu(false);
  });
  
  toggleMenu(false);
});
