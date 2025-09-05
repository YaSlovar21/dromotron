export const configProductCard = {
  cardTemplateSelector: "#product-card-template",
  cardSelector: ".product-card",
  configFields: [
    {
      selector: ".card__image",
      whatChange: "src",
      privateVarname: "_imageEl",
      key_in_dataobj: "image_name",
    },
    {
      selector: ".card__image",
      whatChange: "alt",
      privateVarname: "_imageAlt",
      key_in_dataobj: "title"
    },
    {
      selector: ".card__title",
      whatChange: "textContent",
      privateVarname: "_titleEl",
      key_in_dataobj: "title",
    },
    {
      selector: ".card__price",
      whatChange: "textContent",
      privateVarname: "_priceEl",
      key_in_dataobj: "price",
      formatter: (value) => `${value} руб.`,
    },
    {
      selector: ".card__weight",
      whatChange: "textContent",
      privateVarname: "_weightEl",
      key_in_dataobj: "weight",
      formatter: (value) => `Вес: ${value} кг`,
    },
    {
      selector: ".cart-quantity",
      whatChange: "value",
      privateVarname: "_quantityInput",
      key_in_dataobj: "count", // можно добавить в данные
      defaultValue: "1"
    },
    {
      selector: ".cart-btn-minus",
      whatChange: "dataset.action",
      privateVarname: "_minusBtn",
      key_in_dataobj: "id", // или другой идентификатор
      defaultValue: "decrease"
    },
    {
      selector: ".cart-btn-plus",
      whatChange: "dataset.action",
      privateVarname: "_plusBtn",
      key_in_dataobj: "id",
      defaultValue: "increase"
    },
    {
      selector: ".card__link",
      whatChange: "href",
      privateVarname: "_linkEl",
      key_in_dataobj: "linkPath",
      formatter: (value) => `/${value}`,
    }
  ],
  dataobj_test: {
    image_name: "plast-ti025-1234-L.png",
    linkPath: "komplektuyushchie-dlya-teploobmennikov/plates/ti025/ti025-aisi316-l-1234-0_4-mm.html",
    price: "316",
    title: "Пластина ТИ025 1.4401/AISI316 0.4mm L 1234",
    weight: "0.136",
    id: "product-12345",
    initial_quantity: "1"
  }
};