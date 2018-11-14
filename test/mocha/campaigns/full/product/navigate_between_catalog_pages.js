const authentication = require('../../common_scenarios/authentication');
const product = require('../../common_scenarios/catalog/product');
const {Menu} = require('../../../selectors/BO/menu');


let productData = {
  name: 'P1',
  reference: 'P10169',
  quantity: '30',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ]
};

scenario('Navigate between the catalog pages in the back office', () => {
  authentication.signInBO('NavigateBetweenCatalogPage');
  scenario('Create products to have more than 20 product in the catalog', client => {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 1000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should create products if there\'s less than 20 product in the list', async () => product.checkPaginationThenCreateProduct(client, productData));
  }, 'catalog/product');

  scenario('Navigate between catalog pages', client => {
    test('should navigate between catalog pages and set the paginate limit equal to 20', () => product.checkPaginationBO(client, 'Next', '1', "20", false, true));
    test('should navigate between catalog pages and set the paginate limit equal to 50', () => product.checkPaginationBO(client, 'Next', '1', "50"));
    test('should navigate between catalog pages and set the paginate limit equal to 100', () => product.checkPaginationBO(client, 'Next', '1', "100", true));
  }, 'catalog/product')

}, 'common_client', true);
