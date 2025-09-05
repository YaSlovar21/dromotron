import { configProductCard } from '../js/components/card-configs.js';
import CardWithCartManage from '../js/components/CardWithCartManage.js';
import CardWithDynamicObj from '../js/components/CardWithDynamicObj.js';
import DynamicRenderer from '../js/components/DynamicRenderer.js';

import Section from '../js/components/Section.js';
import { testPlatesArr } from '../js/utils/constants.js';
import { getPlatesAllRequest } from '../js/utils/hexie-api.js';
import {cart, checkCartLinkState} from './index.js';

//testPlatesArr.map(i => cart.addItem(i.linkPath, i));

const preloader = document.querySelector('.cart-preloader');

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
      },
      handleDecreaceInCart: (cardObj) => {
        cart.removeItem(cardObj.linkPath);
        card.updateCard();
        checkCartLinkState();
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
  console.log('mappedFromCart', mappedFromCart)

  cartSection.setItems(mappedFromCart);
  cartSection.renderItems();
}

initCart();

/*
{"errorMessage":"8 RESOURCE_EXHAUSTED: ResourceExhausted","errorType":"Error","stackTrace":[{"function":"callErrorFromStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/call.js","line":32,"column":19},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client.js","line":193,"column":76},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client-interceptors.js","line":361,"column":141},{"function":"Object.onReceiveStatus","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client-interceptors.js","line":324,"column":181},{"function":null,"file":"/function/code/node_modules/@grpc/grpc-js/build/src/resolving-call.js","line":135,"column":78},{"function":"process.processTicksAndRejections","file":"node:internal/process/task_queues","line":85,"column":11},{"line":"for call at"},{"function":"Client.makeUnaryRequest","file":"/function/code/node_modules/@grpc/grpc-js/build/src/client.js","line":161,"column":32},{"function":"Proxy.rpcImpl","file":"/function/code/node_modules/ydb-sdk/build/esm/src/utils.js","line":146,"column":36},{"function":"Proxy.<anonymous>","file":"/function/code/node_modules/ydb-sdk/build/esm/src/utils.js","line":127,"column":41},{"function":"process.processTicksAndRejections","file":"node:internal/process/task_queues","line":105,"column":5}]}
*/