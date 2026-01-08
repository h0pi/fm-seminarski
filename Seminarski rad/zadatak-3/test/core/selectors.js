module.exports = {

  home: {
    body: "body",
    cartLink: 'a.icon--action[href="/kosarica"]',
    cartCount: "#cartCount",
    searchInput: '#header__search-box-input',
    searchSubmit: 'form button[type="submit"]',
  },
  search: {
    box: '.header__search-box',
    input: '.header__search-box-input input',
    submit: '.srch',
    results: '.product, .products, .product-item'
  },
  
  product: {
    addToCartBtn: '.buttons_new_gen a.main-button',
  },

  cart: {
    qtyInput: ".qu__value input",   
    qtyPlus: ".qu__plus",          
    qtyMinus: ".qu__minus", 
    removeBtn: 'a[href^="#removeFromCart-"], a[href*="removeFromCart"] .ci__action, a[onclick^="removeFromCart"]',
    totalPrice: '.cart-total, .order-total, .total',
    emptyCartText: '.cart-empty, .empty-cart',
  },

 
  checkout: {
    cartContinueBtn: 'a[href*="blagajna"] button',
    continueBtn: 'button[type="submit"]',

    email: '#email',
    name: '#name',
    phone: '#phone_number',
    paymentName: '#payment_name',
    paymentPhone: '#payment_phone_number',
    paymentAddress: '#payment_address',
    paymentCity: '#payment_city',
    paymentZip: '#payment_postal_zip',
    paymentCountry: '#payment_country',


    deliveryName: '#delivery_name',
    deliveryPhone: '#delivery_phone_number',
    deliveryAddress: '#delivery_address',
    deliveryCity: '#delivery_city',
    deliveryZip: '#delivery_postal_zip',


    checkoutButton: '.checkout__button button',
    city: 'select[name="city"], #city',
    errorBox: '.alert-danger, .text-danger, .validation-error',
    successBox: '.alert-success, .order-success',
  }
};
