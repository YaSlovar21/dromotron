const ROUTES = {
    catalog: '/catalog/',
    calc: '/equipment-selection/',
    productuion: '/production.html',
    blog: '/blog-proizvodstva/',

    pto: '/plastinchatye-teploobmenniki/',
    ptoRaschets: '/plastinchatye-teploobmenniki/raschets/',
    ptoOtopAgr: '/plastinchatye-teploobmenniki/otoplenie/',
    ptoGvsAgr: '/plastinchatye-teploobmenniki/goryachee-vodosnabzhenie-gvs/',
  
    ptoFood: '/pishchevye-teploobmenniki.html',

    btp: '/blochnye-teplovye-punkty/',
    pou: '/pasterizatsionno-okhladitelnye-ustanovki.html',
    about: '/about/',
    service: '/service.html',
    contacts: '/contacts.html',
    //vacs: '/about/vakansii/',
};

const ROUTES_SPEC = {

  ptoNewGofr: '/plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html',
  ptoTeploizol: '/plastinchatye-teploobmenniki/teploizolyaciya.html',
  ptoPayan: '/plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/',
  ptoPoddony: '/plastinchatye-teploobmenniki/poddony-iz-nerzhaveyushchej-stali.html'
}


const uslugiList = [{
  name: "Laser cutting of ferrous steels up to 25mm thick, stainless steels and non-ferrous metals up to 20mm thick",
  linkPath: "#",
  },
  {
  name: "Gas cutting of black steels up to 100mm thick",
  linkPath: "#",
  },
  {
  name: "CNC turning (serialized parts)",
  linkPath: "#",
  },
  {
  name: "Milling (including production of stamps and molds)",
  linkPath: "#",
  },
  {
  name: "Argon welding",
  linkPath: "#",
  },
  {
  name: "CNC bending",
  linkPath: "#",
  },
  ]
  ;


const refs = [
  {
    name: "Теплообменник P077-150 ",
    desc: "Food heat exchanger for pasteurization and further cooling of wort in 2 stages",
  },
  {
    name: "Laser cutting and hardening of metal",
    desc: "Food heat exchanger for pasteurization and further cooling of wort in 2 stages",
  },
  {
    name: "Stainless steel heat exchanger trays",
    desc: "Food heat exchanger for pasteurization and further cooling of wort in 2 stages",
  },
  {
    name: "Gear for Kamaz",
    desc: "Food heat exchanger for pasteurization and further cooling of wort in 2 stages",
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