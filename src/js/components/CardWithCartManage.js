import CardWithDynamicObj from "./CardWithDynamicObj";
import DynamicRenderer from "./DynamicRenderer";

export default class CardWithCartManage extends CardWithDynamicObj {
  constructor({ handleIncreaseInCart, handleDecreaceInCart, handleRemoveFromCart, handleSomeElementNull, ...props}, dynamicRenderer, cart) {
      super(props, dynamicRenderer);
      this._handleIncreaseInCart = handleIncreaseInCart;
      this._handleDecreaceInCart = handleDecreaceInCart;
      this._handleRemoveFromCart = handleRemoveFromCart;
      this._handleSomeElementNull = handleSomeElementNull;
      this._cart = cart;

      this._dynamicRenderer = new DynamicRenderer(props.configFields);
  }


  generateCard() {
      this._element = super.generateCard();
      return this._element;
  }

  updateCard() {
    //console.log('this._cart', this._cart.getItems());
    const inCartItems = this._cart.getItems();
    const q = inCartItems[this._cardObj.linkPath]?.quantity || 0;
    if (q===0)
      this._handleSomeElementNull();
    else
      //console.log(this._dynamicRenderer._elementsMap.get('_quantityInput'));
      this._dynamicRenderer.updateField('_quantityInput', q);
  }

  _setEventListeners() {
    super._setEventListeners();
    //console.log( this._dynamicRenderer._elementsMap.get('_plusBtn'));
    //console.log( this._dynamicRenderer._elementsMap.get('_minusBtn'));

    this._dynamicRenderer._elementsMap.get('_plusBtn').element.addEventListener('click', () => {this._handleIncreaseInCart(this._cardObj)});
    this._dynamicRenderer._elementsMap.get('_minusBtn').element.addEventListener('click', () => { this._handleDecreaceInCart(this._cardObj)});
  }
}
