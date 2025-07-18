const ROUTES = {
  //основные категории
    kompls: '/komplektuyushchie-dlya-teploobmennikov/',
    ptoFood: '/pishchevye-teploobmenniki/',
    ptoFoodOpros: '/pishchevye-teploobmenniki/oprosnye-listy/',
    uslugi: '/uslugi/',
    about: '/about/',
    contacts: '/contacts/',
};

const ROUTES_SPEC = {
  /*
    ptoNewGofr: '/plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html',
    ptoTeploizol: '/plastinchatye-teploobmenniki/teploizolyaciya.html',
    ptoPayan: '/plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/',
    ptoPoddony: '/plastinchatye-teploobmenniki/poddony-iz-nerzhaveyushchej-stali.html'
  */
};



const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}



 const sequence = [
  "title",
  "teploobmennik",
  "steel_mark_aisi",
  "thinkness",
  "pattern",
  "holes",
  "weight",
  "price",
  "availability",
];


const dict = {
  "title": "Наименование пластины",
  "availability": "Наличие, шт.",
  "holes": "Расположение отверстий",
  "pattern": "Рисунок",
  "pattern_img_num": "Рисунок",
  "price": "Цена, руб. с НДС",
  "steel_mark_aisi": "Марка стали",
  "teploobmennik": "Типоразмер",
  "thinkness": "Толщина",
  "weight": "Вес, кг"
};

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  standartClasses,
  sequence,
  dict
}