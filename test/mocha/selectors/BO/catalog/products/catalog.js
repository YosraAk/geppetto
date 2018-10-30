module.exports = {
  Catalog: {
    add_new_button: '#page-header-desc-configuration-add',
    filter_input: '#product_catalog_list thead[class="with-filters"] input[name="filter_column_%NAME"]',
    submit_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_submit"]',
    searched_product_link: '#product_catalog_list td:nth-child(4) > a',
    reset_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_reset"]',
    tools_button: '#catalog-tools-button',
    import_button: '#desc-product-import',
    searched_product_edit_link: '#product_catalog_list table.product > tbody >tr:nth-child(%id) > td:nth-child(%pos) a.tooltip-link',
    category_filter_button: '#product_catalog_category_tree_filter > button',
    expand_category_link: '#product_catalog_category_tree_filter_expand',
    category_radio_button: '#product_categories_categories input[value="%value"]',
    unselect_button: '#product_catalog_category_tree_filter_reset',
    product_table: '#product_catalog_list  table > tbody',
    reset_button: '#product_catalog_list button[name="products_filter_reset"]',
    id_product_min_input: 'input#filter_column_id_product_min',
    id_product_max_input: 'input#filter_column_id_product_max',
    price_product_min_input: 'input#filter_column_price_min',
    price_product_max_input: 'input#filter_column_price_max',
    quantity_product_min_input: 'input#filter_column_sav_quantity_min',
    quantity_product_max_input: 'input#filter_column_sav_quantity_max',
    status_select: '#product_filter_column_active select',
    status_column: '#product_catalog_list  table > tbody td:nth-child(%TD) > a .action-%class',
    reorder_button: 'input[name="products_filter_position_asc"]',
    searched_column: '#product_catalog_list  table > tbody > tr:nth-child(%i) > td:nth-child(%TD)'
  }
};
