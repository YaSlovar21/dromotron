const ROUTES = {
  //основные категории
    cart: '/cart/',
    kompls: '/komplektuyushchie-dlya-teploobmennikov/',
    kompls_plates: '/komplektuyushchie-dlya-teploobmennikov/plates/',
    kompls_uplots: '/komplektuyushchie-dlya-teploobmennikov/uplots/',
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



 const sequencePlate = [
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

const sequenceUplot = [
  "title", // Полное название товара для отображения
  "teploobmennik", // Полное название модели теплообменника
  "material", // Полное название материала уплотнения с типом крепления
  "material_sm", // Материал уплотнения (краткое обозначение)
  "type", // Тип уплотнения (start, end, intermediate и т.д.)
  "weight", // Вес уплотнения в килограммах
  "price", // Цена уплотнения в рублях
];

const dictUplot = {
  "categoryNumId": "ID категории",
  "id": "ID",
  "material": "Материал уплотнения с типом крепления",
  "material_sm": "Материал (краткое обозначение)",
  "price": "Цена уплотнения в рублях",
  "teploobmennik": "Модель теплообменника",
  "title": "Полное название уплотнения",
  "type": "Тип уплотнения",
  "weight": "Вес уплотнения в килограммах"
};

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

const uplot_expl =   {
  "categoryNumId": null,
  "decimal_test": "423.0991",
  "decimal_test1": "423",
  "id": 1,
  "image_name": "uplot-ti025-start.png",
  "linkPath": "komplektuyushchie-dlya-teploobmennikov/uplots/ti025/uplot-ti025-epdm-start.html",
  "material": "EPDM(p) Clip-On",
  "material_sm": "epdm",
  "price": "164.63",
  "teploobmennik": "ТИ025",
  "teploobmennik_num": "025",
  "textId": "ti025",
  "title": "Уплотнение ТИ025 EPDM(p) Clip-On Start",
  "type": "start",
  "weight": "0.04"
};

const dictPlate = {
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


const cssProseObj = {
  '--tw-prose-body' : '#f2f2f2',
  '--tw-prose-headings' : '#e2e8f0',
  '--tw-prose-lead' : '#d7d7d7',
  '--tw-prose-links' : '#F36D4A',
  '--tw-prose-bold' : '#171717',
  '--tw-prose-counters' : '#737373',
  '--tw-prose-bullets' : '#ff5e3a',
  '--tw-prose-hr' : '#e5e5e5',
  '--tw-prose-quotes' : '#f2f2f2',
  '--tw-prose-quote-borders' : '#e5e5e5',
  '--tw-prose-captions' : '#a3a2a2',
  '--tw-prose-code' : '#171717',
  '--tw-prose-pre-code' : '#e5e5e5',
  '--tw-prose-pre-bg' : '#262626',
  '--tw-prose-th-borders' : '#773838',
  '--tw-prose-td-borders' : '#773838',
}

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  standartClasses,
  sequencePlate,
  dictPlate,
  sequenceUplot,
  dictUplot,

  //служебные
  cssProseObj
}