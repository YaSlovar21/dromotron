export default class Cart {
  constructor() {
      this.state = this.loadFromStorage();
  }

  // Загрузка из localStorage
  loadFromStorage() {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : {};
  }

  // Сохранение в localStorage
  saveToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.state));
  }

  // Добавить товар (увеличить quantity на 1)
  addItem(uniqueKeyId, itemData = {}) {
      if (this.state[uniqueKeyId]) {
          this.state[uniqueKeyId].quantity += 1;
      } else {
          this.state[uniqueKeyId] = {
              ...itemData,
              quantity: 1
          };
      }
      this.saveToStorage();
      return this.state[uniqueKeyId];
  }

  // Удалить товар (уменьшить quantity на 1)
  removeItem(uniqueKeyId) {
      if (!this.state[uniqueKeyId]) return null;

      if (this.state[uniqueKeyId].quantity > 1) {
          this.state[uniqueKeyId].quantity -= 1;
      } else {
          delete this.state[uniqueKeyId];
      }

      this.saveToStorage();
      return this.state[uniqueKeyId];
  }

  // Полностью удалить товар из корзины
  removeItemCompletely(uniqueKeyId) {
      if (!this.state[uniqueKeyId]) return null;

      delete this.state[uniqueKeyId];
      this.saveToStorage();
      return null;
  }

  // Получить количество конкретного товара
  getItemQuantity(uniqueKeyId) {
      return this.state[uniqueKeyId]?.quantity || 0;
  }

  // Получить общее количество товаров в корзине
  getTotalQuantity() {
      return Object.values(this.state).reduce((total, item) => total + item.quantity, 0);
  }

  // Получить общую стоимость
  getTotalPrice(plates) {
    // подправить потом
    const cart_reduced = Object.keys(this.state).reduce((acc, key) => {
      const { price } = plates[key]
      acc[key] = {
        ...this.state[key],
        ...(price !== undefined && { price })
      };
      return acc;
    }, {});
    const totalPrice =  Object.values(cart_reduced).reduce((total, item) => {
      console.log('Object.values(this.state).reduce((total, item)', item);
        return total + (item.price * item.quantity);
    }, 0);

      return totalPrice;
  }

  // Очистить корзину
  clear() {
      this.state = {};
      this.saveToStorage();
  }

  getItem(uniqueKeyId) {
    return this.state[uniqueKeyId];
  }
  // Получить все товары
  getItems() {
      return { ...this.state };
  }

  getItemsForSend(rawDataToReduce) {
    // подправить потом
    const cart_reduced = Object.keys(this.state).reduce((acc, key) => {
      const { price, title } = rawDataToReduce[key];
      acc[key] = {
        ...this.state[key],
        ...(price !== undefined && { price }),
        ...(title !== undefined && { title })
      };
      return acc;
    }, {});
    return Object.values(cart_reduced);
  }
}