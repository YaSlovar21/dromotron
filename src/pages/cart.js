import { configProductCard } from '../js/components/card-configs.js';
import CardWithCartManage from '../js/components/CardWithCartManage.js';
import CardWithDynamicObj from '../js/components/CardWithDynamicObj.js';
import DynamicRenderer from '../js/components/DynamicRenderer.js';

import Section from '../js/components/Section.js';
import { testPlatesArr } from '../js/utils/constants.js';
import { getPlatesAllRequest } from '../js/utils/hexie-api.js';
import {cart, checkCartLinkState} from './index.js';

const { renderLoading } = require("../js/utils/utils");
import FormValidatorNew from '../js/components/FormValidatorNew';
import FormStatic from '../js/components/FormStatic.js';
import Api from '../js/components/Api.js';

// testPlatesArr.map(i => cart.addItem(i.linkPath, i));
const formApi = new Api({
  baseUrl: 'https://api.dromotron.ru',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});


const preloader = document.querySelector('.cart-preloader');

const totalPriceEl = document.querySelector('.cart-total-price')

let plates;

function mapperCartToRender(arrayReducedByUniqueId) {
  const elInCarts = cart.getItems();
  return Object.keys(elInCarts).map(i=> ({
    ...arrayReducedByUniqueId[i],
    count: elInCarts[i].quantity,
    i: i
  }))
}

function updateCartSection() {
  cartSection.setItems(mapperCartToRender(plates));
  cartSection.clear();
  cartSection.renderItems();
}

function updateTotalPriceAndWeight() {
  const totalPrice = cart.getTotalPrice(plates);
  console.log('total_price',totalPrice)
  totalPriceEl.textContent = totalPrice;
}

const dynamicRendererCardInCart = new DynamicRenderer(configProductCard.configFields);
//cart.clear();
const cartSection = new Section({
  data: [],
  renderer: (cardObj) => {
    const card = new CardWithCartManage({
      ...configProductCard,
      cardObj: cardObj,
      handleIncreaseInCart: (cardObj)=> {
        cart.addItem(cardObj.linkPath);
        card.updateCard();
        checkCartLinkState();
        updateTotalPriceAndWeight();
      },
      handleDecreaceInCart: (cardObj) => {
        cart.removeItem(cardObj.linkPath);
        card.updateCard();
        checkCartLinkState();
        updateTotalPriceAndWeight();
      },
      handleSomeElementNull: () =>{
        updateCartSection();

      }
    }, dynamicRendererCardInCart, cart);
    const cardEl  = card.generateCard();

    cartSection.appendItem(cardEl);
  }
}, '.cart');



async function initCart() {
  const platesArr = await getPlatesAllRequest();
  plates = platesArr.reduce((res, item)=> ({...res, [item.linkPath]: item}), {}); //linkPath - это и будет uniqueId
  preloader.style.display='none';
  //console.log(plates["komplektuyushchie-dlya-teploobmennikov/plates/ti025/ti025-aisi316-h-1234-0_4-mm.html"]);
  /*platesArr.slice(0,20).map((i, index)=> {
    cart.addItem(i.linkPath)
  })*/

  const mappedFromCart = mapperCartToRender(plates);
  console.log('mappedFromCart', mappedFromCart);

  cartSection.setItems(mappedFromCart);
  cartSection.renderItems();
  updateTotalPriceAndWeight();
}

initCart();

/*
{"errorMessage":"8 RESOURCE_EXHAUSTED: ResourceExhausted","errorType":"Error","stackTrace":[{"function":"callErrorFromStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/call.js","line":32,"column":19},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client.js","line":193,"column":76},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client-interceptors.js","line":361,"column":141},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client-interceptors.js","line":324,"column":181},{"function":null,"file":"/function/code/node_modules/@grpc/grpc-js/build/src/resolving-call.js","line":135,"column":78},{"function":"process.processTicksAndRejections","file":"node:internal/process/task_queues","line":85,"column":11},{"line":"for call at"},{"function":"Client.makeUnaryRequest","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client.js","line":161,"column":32},{"function":"Proxy.rpcImpl","file":"/function/code/node_modules/ydb-sdk/build/esm/src/utils.js","line":146,"column":36},{"function":"Proxy.<anonymous>","file":"/function/code/node_modules/ydb-sdk/build/esm/src/utils.js","line":127,"column":41},{"function":"process.processTicksAndRejections","file":"node:internal/process/task_queues","line":105,"column":5}]}
*/

const cartFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.cart-submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const cartForm = document.forms.cartForm;
const cartFormSubmitButton = cartForm.querySelector('.cart-submit-button');
const cartFormValidator = new FormValidatorNew(cartFormConfig, cartForm);
cartFormValidator.enableValidation();

const cartFormStatic = new FormStatic({
    formSubmitHandler: (callBackData) => {

      const order = cart.getItemsForSend(plates);
      const totalPrice = cart.getTotalPrice(plates);

      renderLoading('loading', cartFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');

      formApi.sendCartForm({...callBackData, order, totalPrice})
        .then((response) => {
          console.log(response);
          renderLoading('sended', cartFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно!');
          //очистить корзину после отправки
        })
        .catch((err) => console.log(err))
        .finally(() => {
          cartForm.reset();
          setTimeout(()=> {
            renderLoading('default', cartFormSubmitButton, 'Оставить заявку', 'Отправляем...', 'Отправлено успешно');
          }, 900);
        });
    },
    formCleanError: () => {},
    checherValidation: (formElement) => {
      if (!cartFormValidator.hasInvalidInput()) {
        return true;
      } else {
        cartFormValidator.showErrors();
        return false;
      }
    }
  }, cartForm, cartFormConfig.inputSelector);

  cartFormStatic.setEventListeners();
