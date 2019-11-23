let divMenu;
let btMenu;
let btAccount;

let menuState;

function toggleMenu(state) {
  if (state !== null && state !== undefined) {
    menuState = state;
  } else {
    menuState = !menuState;
  }
  
  if (!menuState) {
    divMenu.style.left = `${0 - divMenu.offsetWidth}px`;
    btMenu.style.left = 0;
  } else {
    divMenu.style.left = 0;
    btMenu.style.left = `${divMenu.offsetWidth - 1}px`;
  }
}

window.addEventListener('load', () => {
  divMenu = elemById('divMenu');
  btMenu = elemById('btMenu');
  btAccount = elemById('btAccount');
  
  btMenu.addEventListener('click', () => {
    toggleMenu();
  });
  
  toggleMenu(false);
});
