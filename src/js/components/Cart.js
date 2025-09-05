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
  getTotalPrice() {
      return Object.values(this.state).reduce((total, item) => {
          return total + (item.price * item.quantity);
      }, 0);
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
}