const ROUTES = {
  //основные категории
    kompls: '/komplektuyushchie-dlya-teploobmennikov/',
    kompls_plates: '/komplektuyushchie-dlya-teploobmennikov/plates/',
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


const plate_expl = {
  availability: "Много",
  decimal_test: null,
  holes: "1234",
  id: 1,
  image_name: "plast-ti025-1234-H.png",
  pattern: "H",
  pattern_img_num: 1,
  price: "316",
  steel_mark: "1.4401/AISI316",
  steel_mark_aisi: "AISI316",
  teploobmennik: "ТИ025",
  teploobmennik_num: "025",
  textId: "ti025",
  thinkness: "0.4",
  title: "Пластина ТИ025 1.4401/AISI316 0.4mm H 1234",
  weight: "0.136",
};

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