let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async getFilteredProducts(selector, tagName, wait = 0) {
    await this.waitFor(wait)
    await page.$eval(selector, (el, tagName) => el.getElementsByTagName(tagName).length, tagName).then((number) => {
      global.productsNumber = number;
    })
  }

  async checkProductCategory(Catalog, basicSettings, CommonBO, productsNumber, selectedCategory) {
    await this.waitFor(5000);
    for (let i = 1; i <= productsNumber; i++) {
      await this.scrollWaitForAndClick(Catalog.searched_product_edit_link.replace('%id', i).replace('%pos', 11), 3000);
      await this.closeSymfonyToolbar(CommonBO.symfony_toolbar_close_button, 3000);
      await this.isExisting(basicSettings.checked_category_input.replace('%value', selectedCategory), 4000);
      await this.waitForAndClick(basicSettings.dropdown_menu_button, 2000);
      await this.waitForAndClick(basicSettings.go_to_catalog_link, 2000);
    }
  }

  async checkProductResult(Catalog, selector, data, expectType = "contain", columnName = '') {
    await this.waitFor(7000);
    await this.getFilteredProducts(Catalog.product_table, 'tr');
    switch (expectType) {
      case "bigger":
        for (let i = 1; i <= productsNumber; i++) {
          await page.$eval(selector.replace('%i', i), el => el.innerText).then((text) => {
            if (columnName == 'price') {
              text = text.split('€');
              let textToCompareWith = parseFloat(text[1]);
              expect(textToCompareWith).to.be.gte(parseFloat(data))
            } else {
              expect(parseInt(text)).to.be.gte(parseInt(data))
            }
          });
        }
        break;
      case "less":
        for (let i = 1; i <= productsNumber; i++) {
          await page.$eval(selector.replace('%i', i), el => el.innerText).then((text) => {
            if (columnName == 'price') {
              text = text.split('€');
              let textToCompareWith = parseFloat(text[1]);
              expect(textToCompareWith).to.be.lte(parseFloat(data))
            } else {
              expect(parseInt(text)).to.be.lte(parseInt(data))
            }
          });
        }
        break;
      case "contain":
        for (let i = 1; i <= productsNumber; i++) {
          await page.$eval(selector.replace('%i', i), el => el.innerText).then((text) => {
            expect(text.toLowerCase()).to.have.string(data.toLowerCase())
          });

        }
        break;
      case "exist":
        for (let i = 1; i <= productsNumber; i++) {
          if (data == "1") {
            await this.isExisting(selector.replace('%class', 'enabled'));
          } else {
            await this.isExisting(selector.replace('%class', 'disabled'));
          }
        }
        break;
    }
  }

  async searchProductInBO(selector, valueToSearch, Catalog, columnSelector, expectType = "contain", columnName = '') {
    await this.waitFor(6000);
    if (columnName == 'status') {
      await this.waitForAndSelect(selector, valueToSearch, 3000);
    } else {
      await this.clearInputAndSetValue(selector, valueToSearch, 3000);
    }
    await this.waitForAndClick(Catalog.submit_filter_button, 1000);
    await this.checkProductResult(Catalog, columnSelector, valueToSearch, expectType, columnName);
    await this.waitForAndClick(Catalog.reset_button, 3000);
  }
}

module.exports = Product;
