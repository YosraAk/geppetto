let CommonClient = require('../common_client');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async searchProductByName(productName) {
    await this.waitForAndClick(Catalog.products_search_name_input_field);
    await this.clearInputAndSetValue(Catalog.products_search_name_input_field, productName);
    await this.waitForAndClick(Catalog.products_search_button);
  }

  async checkProductPriceTE(priceTE) {
    await this.waitFor(Catalog.products_calatogue_product_price_column.replace("%ID", 1), 60000);
    await page.$eval(Catalog.products_calatogue_product_price_column.replace("%ID", 1), (el) => el.innerText).then((price) => {
      expect(price.replace('€', '')).to.be.equal(priceTE + '.00')
    });
  }
}

module.exports = Product;