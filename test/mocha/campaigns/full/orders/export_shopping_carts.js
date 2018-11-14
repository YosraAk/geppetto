const authentication = require('../../common_scenarios/authentication');
const {Menu} = require('../../../selectors/BO/menu');
const {ShoppingCart} = require('../../../selectors/BO/orders/shoppingCart');

scenario('Export shopping carts in the Back Office', () => {
  authentication.signInBO('exportShoppingCart');
  scenario('Login in the Back Office', () => {
    scenario('Search for the shopping carts to export', function (client) {
      test('should go to "Shopping Cart" page', async () => {
        await client.waitForAndClick(Menu.Sell.Orders.orders_menu);
        await client.waitForAndClick(Menu.Sell.Orders.shopping_carts_submenu, 1000);
      });
      test('should set the "Customer" input', async () => await client.clearInputAndSetValue(ShoppingCart.search_input.replace('%searchParam', 'c!lastname'), 'DOE', 1000));
      test('should set the "Carrier" input', async () => await client.clearInputAndSetValue(ShoppingCart.search_input.replace('%searchParam', 'ca!name'), 'My carrier'));
      test('should click on the "search" button', async () => await client.waitForAndClick(ShoppingCart.search_button));
      test('should get the "Shopping Carts" number', async () => await client.getShoppingCartNumber(ShoppingCart.id_shopping_carts, 1000));
      test('should get the "Shopping Carts" info', async () => await client.getShoppingCartsInfo());
      test('should export the "Shopping Carts" then check the exported file information', async () => await client.checkExportedFile());
    }, 'orders/shoppingCarts');
  }, 'orders/shoppingCarts');
}, 'orders/shoppingCarts', true);
