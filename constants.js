const ROUTES = {
  //основные категории
    kompls: '/komplektuyushchie-dlya-teploobmennikov/',
    ptoFood: '/pishchevye-teploobmenniki/',
    uslugi: '/uslugi/',
    
    about: '/about/',
    contacts: '/contacts/',
};

const ROUTES_SPEC = {

  ptoNewGofr: '/plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html',
  ptoTeploizol: '/plastinchatye-teploobmenniki/teploizolyaciya.html',
  ptoPayan: '/plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/',
  ptoPoddony: '/plastinchatye-teploobmenniki/poddony-iz-nerzhaveyushchej-stali.html'
}


const uslugiList = [{
  name: "Лазерная резка чёрных сталей толщиной до 25мм, нержавеющих сталей и цветных металлов толщиной до 20мм",
  linkPath: "#",
  },
  {
  name: "Газовая резка чёрных сталей толщиной до 100 мм",
  linkPath: "#",
  },
  {
  name: "Токарная обработка с ЧПУ (серийные детали)",
  linkPath: "#",
  },
  {
  name: "Фрезерная обработка (в том числе изготовление штампов и пресс-форм)",
  linkPath: "#",
  },
  {
  name: "Сварка в среде аргона",
  linkPath: "#",
  },
  {
  name: "Гибка с ЧПУ",
  linkPath: "#",
  },
];


const refs = [
  {
    name: "Теплообменник P077-150 ",
    desc: "Пищевой теплообменный аппарат для пастеризации и дальнейшего охлаждения сусла в 2 ступени",
  },
  {
    name: "Лазерная резка и закалка металла",
    desc: "",
  },
  {
    name: "Поддоны из нержавеющей стали",
    desc: "",
  },
  {
    name: "Индивидуальное изготоаление деталей",
    desc: "",
  },
]

const phProcs = [
  {
    id: 'prod',
    name: 'Готовая продукция',
    pathId: 'production',
  },
  {
    id: 'plastAndUplot',
    name: 'Производство пластин и уплотнений',
    pathId: 'proizvodstvo-plastin-i-uplotnenii'
  },
  {
    id: 'ptoDetails',
    name: 'Производство деталей теплообменников',
    pathId: 'proizvodstvo-detalei-teploobmennicov'
  }
]

const featuresForCats = {

}

const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  phProcs,
  standartClasses,
  featuresForCats,
  uslugiList,
  refs
}