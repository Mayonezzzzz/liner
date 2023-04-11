const openMenuButton = document.querySelector('.header__menu-toggle');
const menu = document.querySelector('.choise');
const closeMenuButton = menu.querySelector('.choise__close-button');
const menuList = menu.querySelector('.choise-class');
const listBudget = menu.querySelector('.choise-class__list--budget');
const listOffice = menu.querySelector('.choise-class__list--office');
const listCollection = menu.querySelector('.choise-class__list--collection');
const listAirports = menu.querySelector('.choise-class__list--airports');
const listCollector = menu.querySelector('.choise-class__list--collector');

openMenuButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  menu.style.display = "flex";
});

closeMenuButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  menu.style.display = "none";
});

const hideMenu = (elem, target, evt) => {
  if (evt.target.classList.contains('choise-class__link--closed')) {
    evt.preventDefault();
    target.classList.remove('choise-class__link--closed');
    target.classList.add('choise-class__link--opened');
    elem.style.display = "block";
  } else if (evt.target.classList.contains('choise-class__link--opened')) {
    evt.preventDefault();
    target.classList.remove('choise-class__link--opened');
    target.classList.add('choise-class__link--closed');
    elem.style.display = "none";
  }
}

const onMenuElemClick = (evt) => {
  switch(evt.target.id) {
    case 'choise-class__link--budget':
      hideMenu(listBudget, evt.target, evt);
      break;
    case 'choise-class__link--office':
      hideMenu(listOffice, evt.target, evt);
      break;
    case 'choise-class__link--collection':
      hideMenu(listCollection, evt.target, evt);
      break;
    case 'choise-class__link--airports':
      hideMenu(listAirports, evt.target, evt);
      break;
    case 'choise-class__link--collector':
      hideMenu(listCollector, evt.target, evt);
      break;
  }
};

if (document.documentElement.clientWidth < 1042) {
  menuList.addEventListener('click', onMenuElemClick);
}
