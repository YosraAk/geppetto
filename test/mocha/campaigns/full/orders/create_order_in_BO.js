const authentication = require('../../common_scenarios/authentication');
const product = require('../../common_scenarios/catalog/product');
const order = require('../../common_scenarios/orders/order');
const {Menu} = require('../../../selectors/BO/menu');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const {AddProduct} = require('../../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../../selectors/BO/catalog/products/catalog');
const onBoarding = require('../../common_scenarios/onboarding');
const {OrderPage} = require('../../../selectors/BO/orders/orderPage');
const {CreateOrder} = require('../../../selectors/BO/orders/createOrder');

let productData = {
  name: 'P1',
  quantity: "10",
  priceHT: '5',
  reference: 'P10169',
  type: 'combination',
  pictures: [
    '1.png',
    '2.jpg'
  ],
  attribute: {
    1: {
      name: 'color',
      variation_quantity: '10'
    }
  }
};
//TODO : Not yet finished
scenario('Create order in the Back Office', () => {
   authentication.signInBO('createOrderInBO');
   onBoarding.closeOnBoardingModal();
   product.createProduct(productData);
  // scenario('Logout from the Back Office', client => {
  //   test('should logout successfully from the Back Office', async () => await client.signOutBO());
  // }, 'orders/order');

  authentication.signInBO('createOrderInBO');
  order.createOrderBO(OrderPage, CreateOrder, productData);

}, 'orders/order', true);
