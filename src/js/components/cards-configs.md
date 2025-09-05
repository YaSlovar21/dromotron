У меня есть объекты конфиги такого плана:

```javascript
export const configCardProjectHorizontal = {
  cardTemplateSelector: "#project-horizontal-template", // cardTemplateSelector
  cardSelector: '.projects__item', // cardSelector,
  configFields: [
    {
      selector: '.projects__image',
      whatChange: 'src',
      privateVarname: '_cardImageSrc',
      key_in_dataobj: 'link'
    },
    {
      selector: '.projects__image',
      whatChange: 'alt',
      privateVarname: '_cardImageAlt',
      key_in_dataobj: 'name'
    },
    {
      selector: '.projects__item-description',
      whatChange: 'textContent',
      privateVarname: '_cardHeading',
      key_in_dataobj: 'name'
    },
    {
      selector: '.column-description-link',
      whatChange: 'href',
      privateVarname: '_linkEl',
      key_in_dataobj: 'path'
    },
    {
      selector: '.projects__to-model',
      whatChange: 'textContent',
      privateVarname: '_toModelDesc',
      key_in_dataobj: 'to'
    },
    {
      selector: '.projects__to-q',
      whatChange: 'textContent',
      privateVarname: '_toQDesc',
      key_in_dataobj: 'q'
    },
    {
      selector: '.projects__to-naznach',
      whatChange: 'textContent',
      privateVarname: '_naznachDesc',
      key_in_dataobj: 'naznach'
    }
  ],
  dataobj_test: { // пример объекта который рендерится в html template
      name: "Котельная квартала №34, г. Уфа, жилой район «Затон-Восточный»",
      link: '/images/b46f607e557fa86ce5de.png',
      to: "ТИ82-201",
      naznach: "в котельной микрорайона",
      q: "17500 кВт",
      animateClass: 'animate__fadeIn',
      path: '/blog-proizvodstva/teploobmenniki-gvs-object-p-zaton-vostok.html'
  }
};
```

Темплэйт, который мы связываем через configFields c dataobj_test
```html
<template id="project-horizontal-template">
  <div class="projects__item projects__item_horizontal">
    <img class="projects__image projects__image_horizontal rounded-xl overflow-hidden" src="">
    <div class="ml-4 basis-[60%]">
      <h3 class="subtitle-sm max-w-[620px]">Теплообменник <span class="span_color_orange span-bold projects__to-model">ТИ52-87</span> <span class="projects__to-naznach">ГВС</span></h3>
      <ul class="space-y-2 text-gray-100 mb-6">
        <li class="text-m">Мощность: <span class="span-bold projects__to-q">5,6 Гкал/час</span></li>
        <li class="text-m">Назначение: <span class="span-bold projects__to-naznach">ГВС</span></li>
        <li class="span-geo projects__item-description projects__item-description_horizontal text-gray-400">Котельная в квартале 34, г. Уфа, жилой район «Затон-Восточный»</li>
      </ul>
      <a class="column-description-link link-beauty ui-button-text" href="#">Подробнее &#8594; </a>
    </div>
  </div>
</template>
```

Давай сделаем темплэйту для объекта
{
    tel_url: "tel:88007000958",
    tel_text: "8 800 700-09-58"
}
<template>
<div class="<cardSelector>">
<!-- Все остальные поля из объекта пишем тут  -->
</div>
</template>
Если она будет норм, то свяжем сделаем configFields


У меня есть конфиги, в которых выстречаются whatChange: 'array'
если  whatChange = 'array', то внутри этого объекта лежит configForInnerSection, который описывает аналогичный общему конфиг

```javascript
export const articleCardConfig = {
  cardTemplateSelector: '#article-template', // cardTemplateSelector
  cardSelector: '.card-item', // cardSelector
  configFields : [
  {
    selector: '.card-item-title',
    whatChange: 'textContent',
    privateVarname: '_cardHeading',
    key_in_dataobj: 'heading'
  },
  {
    selector: '.card-item-description',
    whatChange: 'textContent',
    privateVarname: '_cardDescription',
    key_in_dataobj: 'description'
  },
  {
    selector: '.card-item-link',
    whatChange: 'href',
    privateVarname: '_link',
    key_in_dataobj: 'linkPath'
  },
  {
    selector: '.card-item-header',
    whatChange: 'array',  // whatChange = 'array'
    privateVarname: '_tagsSection',
    key_in_dataobj: 'tags',
    configForInnerSection: {
      cardTemplateSelector: "#tag-template",
      cardSelector: ".infoitem__span-button",
      configFields: [{
        selector: ".text",
        whatChange: "textContent",
        privateVarname: "_tagMaintext",
        key_in_dataobj: "name"
      }]
    }
  }
]};

```

Давай напишем конфиг и темплэйту для такого объекта, который велючает в себя _telsSection и _emailsSection

{
    "nameOfPartner": "ООО «Хортэк-ОПТ»",
    "city": "Санкт-Петербург",
    "logo": 'тут может быть url картинки',
    "emails": // whatChange = 'array', configForInnerSection: configCardEmailAdvanced //сошлемся на переменную которую уже сделали
    "site": 'тут может быть url сайта',
    "telephoneNumbers": // whatChange = 'array', configForInnerSection: configCardPhoneAdvanced //сошлемся на переменную которую уже сделали
}



```json
  {
    "image_name": "plast-ti025-1234-L.png",
    "linkPath": "komplektuyushchie-dlya-teploobmennikov/plates/ti025/ti025-aisi316-l-1234-0_4-mm.html",
    "price": "316",
    "title": "Пластина ТИ025 1.4401/AISI316 0.4mm L 1234",
    "weight": "0.136"
  }