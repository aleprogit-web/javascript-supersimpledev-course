import { addToCart, cart, loadFromStorage, removeFromCart } from '../../data/cart.js';

describe('test suite: addToCart', () => {

  it('adds an existing product to the cart', ()=> {

    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    const getItemSpy = spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deiveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deiveryOptionId: '1'
      }]));

  });

  it('adds a new product to the cart', () => {

    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    const getItemSpy = spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",quantity:1,
      deliveryOptionId:"1"}])
    );

  });

  
});

describe('test suite: removeFromCart', () => {
  it('removes a product that is in the cart', () => {
    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    const getItemSpy = spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deiveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));

  });

  it('removes a product that is not in the cart', () => {
    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    const getItemSpy = spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deiveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    removeFromCart('does-not-exist');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deiveryOptionId: '1'
      }]));

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

  });
})