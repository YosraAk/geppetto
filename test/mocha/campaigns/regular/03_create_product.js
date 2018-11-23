const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const onBoarding = require('../common_scenarios/onboarding');


let productData = {
  name: 'Dress',
  reference: 'robe',
  quantity: "10",
  priceHT: '5',
  pictures: [
    '1.png'
  ],
};

scenario('Create "Product"', () => {
  authentication.signInBO('createProduct');
  onBoarding.closeOnBoardingModal();
  product.createProduct(productData);
  product.checkProductBO(Catalog, productData);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);

scenario('Check the created product in the Front Office', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO());
  }, 'catalog/product');
}, 'common_client', true);
