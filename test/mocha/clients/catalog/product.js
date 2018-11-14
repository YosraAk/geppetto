let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async clickNextOrPrevious(selector) {
    if (global.visible) {
      return await this.click(selector)
    } else {
      return await this.waitFor(0)
    }
  }
}

module.exports = Product;