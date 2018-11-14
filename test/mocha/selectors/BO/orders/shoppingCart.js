module.exports = {
  ShoppingCart: {
    check_first_order_id: '#table-cart tr:nth-of-type(1) > td:nth-of-type(3) > span',
    check_order_customer: '#table-cart tr:nth-of-type(1) > td:nth-of-type(4)',
    view_order_button: '#table-cart td:nth-of-type(%NUMBER) a[title=View]',
    total_cart: '#box-kpi-cart span.value',
    customer_name: '#content a:contains(^%NAME$)',
    product_unit_price: '#orderProducts tr:nth-of-type(%NUMBER) > td:nth-of-type(3)',
    quantity_product: '#orderProducts tr:nth-of-type(%NUMBER) > td:nth-of-type(4)',
    stock_product: '#orderProducts tr:nth-of-type(%NUMBER) > td:nth-of-type(5)',
    total_product: '#orderProducts tr:nth-of-type(%NUMBER) > td:nth-of-type(6)',
    total_cart_summary: '#orderProducts td:nth-of-type(2) > strong',
    order_page: '#content a[href*=%s]',
    export_carts_button: '#page-header-desc-cart-export_cart',
    search_input: '#table-cart thead input[name="cartFilter_%searchParam"]',
    search_button: '#submitFilterButtoncart',
    id: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(1)',
    order_id: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(2)',
    customer: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(3)',
    total: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(4)',
    carrier: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(5)',
    date: '#table-cart tr:nth-of-type(%NUMBER) > td:nth-of-type(6)',
    customer_online: '#table-cart tr:nth-of-type(%NUMBER) td:nth-of-type(7)',
    id_shopping_carts: 'table-cart',
    reset_button: '[name=submitResetcart]'
  }
};
