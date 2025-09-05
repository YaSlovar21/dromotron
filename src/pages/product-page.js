import { configProductCard } from '../js/components/card-configs.js';
import CardWithCartManage from '../js/components/CardWithCartManage.js';
import DynamicRenderer from '../js/components/DynamicRenderer.js';
import Section from '../js/components/Section.js';
import {cart, checkCartLinkState} from './index.js';

const dynamicRendererCardInCart = new DynamicRenderer(configProductCard.configFields);

const dataElement = document.querySelector('#item-data');
const productItemObj = JSON.parse(dataElement.textContent);
const uniqueId = document.querySelector('.product-page-main').dataset.uniqueid;


//console.log(uniqueId);
const fromCart = cart.getItem(uniqueId); //дописал метод который забирает из стейта корзины объект по id
//console.log(fromCart);


const buttonAddToCart = document.querySelector('.cart-button');

const cartSection = new Section({
  data: [],
  renderer: (cardObj) => {
    const card = new CardWithCartManage({
      ...configProductCard,
      cardObj: cardObj,
      handleIncreaseInCart: (cardObj)=> {
        console.log(uniqueId, cardObj.linkPath);
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
        buttonAddToCart.textContent = 'В корзину';
        buttonAddToCart.disabled = false;
        checkStatusInCart();
      }
    }, dynamicRendererCardInCart, cart);
    const cardEl  = card.generateCard();
    cartSection.appendItem(cardEl);
  }
}, '.cart-main-control');


function checkStatusInCart() {
  const fromCart = cart.getItem(uniqueId);

  cartSection.setItems(fromCart ? [{
      ...productItemObj,
      count: fromCart.quantity // необходимый ключик key_in_data
  }]: []);

  if (fromCart) {
    buttonAddToCart.textContent = 'В корзине';
    buttonAddToCart.disabled = true;
    cartSection.renderItems();
  } else {
    buttonAddToCart.textContent = 'В корзину';
    buttonAddToCart.disabled = false;
    cartSection.clear();
  }
}

checkStatusInCart();

buttonAddToCart.addEventListener('click', ()=> {
  cart.addItem(productItemObj.linkPath);
  checkStatusInCart();
  checkCartLinkState();
});