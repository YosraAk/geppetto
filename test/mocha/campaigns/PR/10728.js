const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {CommonBO} = require('../../selectors/BO/commonBO');
const onBoarding = require('../common_scenarios/onboarding');
let promise = Promise.resolve();

let productData = {
  name: 'Hummingbird printed sweater',
  reference: 'demo_3',
  quantity: '2100',
  priceHT: '35.90',
  status: "1",
  category: "Women",
  id_min: '2',
  id_max: '1',
  price_min: '30',
  price_max: '24',
  quantity_min: '1500',
  quantity_max: '2500',
};
/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10728
 */
scenario('PR-10728: Check the "Category Filter" in the product page', () => {
  authentication.signInBO('10728');
  onBoarding.closeOnBoardingModal();
  scenario('Check the result of "Category Filter" in the product page', client => {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
    });
    //Check Category Filter: Related issue : #10257
    test('should click on the "Filter by categories" button', () => client.waitForAndClick(Catalog.category_filter_button, 2000));
    test('should click on the "Expand" link', () => client.waitForAndClick(Catalog.expand_category_link, 2000));
    test('should choose the "Clothes" category', () => client.waitForAndClick(Catalog.category_radio_button.replace('%value', 3), 2000));
    test('should get the number of the filtered products', () => client.getFilteredProducts(Catalog.product_table, 'tr', 3000));
    test('should check that the product list is filtered by the selected category "Clothes"', () => client.checkProductCategory(Catalog, AddProduct.Basic_settings, CommonBO, global.productsNumber, 3));
    //Check the search of product : Related issue : #10345
    test('should click on the "Reorder" button', async () => {
      await client.isVisible(Catalog.reorder_button, 20000);
      if (visible) {
        await client.waitForAndClick(Catalog.reorder_button, 2000);
      }
    });
    test('should search for the created product by "Name"', () => client.searchProductInBO(Catalog.filter_input.replace('%NAME', 'name'), productData.name, Catalog, Catalog.searched_column.replace('%TD', 4)));
    test('should search for the created product by "Reference"', () => client.searchProductInBO(Catalog.filter_input.replace('%NAME', 'reference'), productData.reference, Catalog, Catalog.searched_column.replace('%TD', 5)));
    test('should search for the created product by "category"', () => client.searchProductInBO(Catalog.filter_input.replace('%NAME', 'name_category'), productData.category, Catalog, Catalog.searched_column.replace('%TD', 6)));
    test('should search for the created product by "ID Min"', () => client.searchProductInBO(Catalog.id_product_min_input, productData.id_min, Catalog, Catalog.searched_column.replace('%TD', 2), 'bigger'));
    test('should search for the created product by "ID Max"', () => client.searchProductInBO(Catalog.id_product_max_input, productData.id_max, Catalog, Catalog.searched_column.replace('%TD', 2), 'less'));
    test('should search for the created product by "Price Min"', () => client.searchProductInBO(Catalog.price_product_min_input, productData.price_min, Catalog, Catalog.searched_column.replace('%TD', 7), 'bigger', "price"));
    test('should search for the created product by "Price Max"', () => client.searchProductInBO(Catalog.price_product_max_input, productData.price_max, Catalog, Catalog.searched_column.replace('%TD', 7), 'less', "price"));
    test('should search for the created product by "Quantity Min"', () => client.searchProductInBO(Catalog.quantity_product_min_input, productData.quantity_min, Catalog, Catalog.searched_column.replace('%TD', 8), 'bigger'));
    test('should search for the created product by "Quantity Max"', () => client.searchProductInBO(Catalog.quantity_product_max_input, productData.quantity_max, Catalog, Catalog.searched_column.replace('%TD', 8), 'less'));
    test('should search for the created product by "Status"', () => client.searchProductInBO(Catalog.status_select, productData.status, Catalog, Catalog.status_column.replace('%TD', 9), 'exist', 'status'));
    test('should click on the "Filter by categories" button', () => client.waitForAndClick(Catalog.category_filter_button, 5000));
    test('should click on the "Unselect" category', () => client.waitForAndClick(Catalog.unselect_button, 2000));
  }, 'catalog/product');

  //Chek that the product list is not empty while editing a product: Related issue #10703 And #10758
  scenario('Check that the "Product List" is not empty while editing a product', client => {
    test('should click on "Edit" link', () => client.waitForAndClick(Catalog.searched_product_edit_link.replace('%id', 1).replace('%pos', 10), 2000));
    test('should click on "Product list" link', () => client.waitForAndClick(AddProduct.product_list_link, 2000));
    test('should check that the "Product list" is not empty', () => client.compareNumberOfElementData(AddProduct.right_sidebar_table, 1, 'tr', 'greaterThan', 2000));
  }, 'catalog/product');

  authentication.signOutBO();
}, 'catalog/product', true);
