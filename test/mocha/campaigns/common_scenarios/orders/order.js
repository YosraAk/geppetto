const {AccountPage} = require('../../../selectors/FO/accountPage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');
const {CheckoutOrderPage} = require('../../../selectors/FO/order/checkoutOrderPage');
const {Menu} = require('../../../selectors/BO/menu');

module.exports = {
  async createOrderFO(authentication = "connect") {
    scenario('Create order in the Front Office', client => {
      test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
      test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
      test('should click on proceed to checkout button 1', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
      test('should click on proceed to checkout button 2', () => client.waitForAndClick(CheckoutOrderPage.proceed_to_checkout_button));
      if (authentication === "connect") {
        scenario('Login with existing customer', client => {
          test('should click on "Sign in" button ', () => client.waitForAndClick(AccountPage.sign_tab));
          test('should set the "Email" input', () => client.waitForAndType(AccountPage.signin_email_input, 'pub@prestashop.com'));
          test('should set the "Password" input', () => client.waitForAndType(AccountPage.signin_password_input, '123456789'));
          test('should click on "CONTINUE" button', () => client.waitForAndClick(AccountPage.continue_button));
        }, 'common_client');
      }
      if (authentication === "connect") {
        scenario('Choose the personal and delivery address ', client => {
          test('should click on confirm address button', () => client.waitForAndClick(CheckoutOrderPage.checkout_step2_continue_button));
        }, 'common_client');
      }
      scenario('Choose "SHIPPING METHOD"', client => {
        test('should choose shipping method my carrier', () => client.waitForAndClick(CheckoutOrderPage.shipping_method_option));
        test('should click on "confirm delivery" button', () => client.waitForAndClick(CheckoutOrderPage.checkout_step3_continue_button));
      }, 'common_client');
      scenario('Choose "PAYMENT" method', client => {
        test('should set the payment type "Payment by bank wire"', () => client.waitForAndClick(CheckoutOrderPage.payment_method_option));
        test('should set "the condition to approve"', () => client.waitForAndClick(CheckoutOrderPage.condition_check_box));
        test('should click on order with an obligation to pay button', () => client.waitForAndClick(CheckoutOrderPage.confirmation_order_button, 1000));
      }, 'common_client');
    }, 'common_client');
  },
  createOrderBO: function (OrderPage, CreateOrder, productData) {
    scenario('Create order in the Back Office', client => {
      test('should go to "Orders" page', async () => {
        await client.waitForAndClick(Menu.Sell.Orders.orders_menu);
        await client.waitForAndClick(Menu.Sell.Orders.orders_submenu);
      });
      test('should click on "Add new order" button', () => client.waitForAndClick(CreateOrder.new_order_button, 1000));
      test('should search for a customer', () => client.waitForAndSetValue(CreateOrder.customer_search_input, 'john doe'));
    //  test('should choose the customer', () => client.waitForAndClick(CreateOrder.choose_customer_button));
      // test('should search for a product by name', () => client.waitForAndSetValue(CreateOrder.product_search_input, productData.name + global.dateTime));
      // test('should set the product combination', () => client.waitForAndSelect(CreateOrder.product_combination, global.combinationId));
      // test('should set the product quantity', () => client.waitForAndSetValue(CreateOrder.quantity_input.replace('%NUMBER', 1), '4'));
      // test('should click on "Add to cart" button', () => client.waitForAndClick(CreateOrder.add_to_cart_button));
      // test('should get the basic product price', () => client.getTextInVar(CreateOrder.basic_price_value, global.basic_price));
      // test('should set the delivery option ', () => client.waitForAndSetValue(CreateOrder.delivery_option, '2,'));
      // test('should add an order message ', () => client.addOrderMessage('Order message test'));
      // test('should set the payment type ', () => client.waitForAndSetValue(CreateOrder.payment, 'ps_checkpayment'));
      // test('should set the order status ', () => client.waitForAndSetValue(OrderPage.order_state_select, '1'));
      // test('should click on "Create the order"', () => client.waitForAndClick(CreateOrder.create_order_button));
    }, 'orders/order');
  },
};