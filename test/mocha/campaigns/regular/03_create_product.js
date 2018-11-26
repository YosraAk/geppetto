const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const onBoarding = require('../common_scenarios/onboarding');
const {HomePage} = require('../../selectors/FO/homePage');
const {ProductPageFO} = require('../../selectors/FO/productPage');


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
}, 'common_client');
scenario('Check the created product in the Front Office', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.openShopURL());
    test('should login successfully in the Front Office', () => client.signInFO());
  }, 'common_client');
  scenario('Check that the created product is well displayed in the Front Office', client => {
    test('should set the shop language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the product', () => client.searchByValue(HomePage.home_search_product_input_field, HomePage.home_search_product_icon, productData.name + dateTime));
    test('should go to the product page', () => client.waitForAndClick(HomePage.home_product_name_link));
    test('should check that the product name is equal to "' + (productData.name + dateTime).toUpperCase() + '"', () => client.checkTextValue(ProductPageFO.product_FO_product_name_title.replace('%ID', 1), (productData.name + dateTime).toUpperCase()));
    test('should check that the product price is equal to "€6.00"', () => client.checkTextValue(ProductPageFO.product_FO_product_price_span.replace('%ID', 1), '€6.00'));
    test('should check that the product reference is equal to "' + productData.reference + '"', async () => {
      await client.scrollIntoView(ProductPageFO.product_FO_product_reference_span);
      await client.checkTextValue(ProductPageFO.product_FO_product_reference_span, productData.reference, 2000)
    });
    test('should check that the product quantity is equal to "10"', () => client.checkAttributeValue(ProductPageFO.product_FO_product_quantity_span, 'data-stock', productData.quantity));
  }, 'common_client');
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from the Front Office', () => client.signOutFO());
  }, 'common_client');
}, 'common_client', true);
