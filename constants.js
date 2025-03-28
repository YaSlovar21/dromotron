const ROUTES = {
  //основные категории
    kompls: '/komplektuyushchie-dlya-teploobmennikov/',
    ptoFood: '/pishchevye-teploobmenniki/',
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


const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  standartClasses,
  refs
}