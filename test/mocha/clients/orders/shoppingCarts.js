let CommonClient = require('../common_client');
const {ShoppingCart} = require('../../selectors/BO/orders/shoppingCart');
global.tab = [];
global.orders = [];
global.lineFile = [];
let dateFormat = require('dateformat');
let fs = require('fs');

class ShoppingCarts extends CommonClient {
  async getShoppingCartNumber(selector, wait = 0) {
    await this.waitFor(wait);
    let result = await page.evaluate((selector) => {
      return document.getElementById(selector).getElementsByTagName("tbody")[0].children.length
    }, selector);
    global.shoppingCartsNumber = await result;
  }

  async getShoppingCartsInfo() {
    for (let i = 1; i <= global.shoppingCartsNumber; i++) {
      await this.getTextInVar(ShoppingCart.id.replace('%NUMBER', i), "id");
      await this.getTextInVar(ShoppingCart.order_id.replace('%NUMBER', i), "order_id");
      await this.getTextInVar(ShoppingCart.customer.replace('%NUMBER', i), "customer");
      await this.getTextInVar(ShoppingCart.total.replace('%NUMBER', i), "total");
      await this.getTextInVar(ShoppingCart.carrier.replace('%NUMBER', i), "carrier");
      await this.getTextInVar(ShoppingCart.date.replace('%NUMBER', i), "date");
      await this.getTextInVar(ShoppingCart.customer_online.replace('%NUMBER', i), "customer_online");
      await parseInt(global.tab["order_id"]) ? global.tab["order_id"] = parseInt(global.tab["order_id"]) : global.tab["order_id"] = '"' + global.tab["order_id"] + '"';
      await global.tab["carrier"] === '--' ? global.tab["carrier"] = '' : global.tab["carrier"] = '"' + global.tab["carrier"] + '"';
      await global.tab["customer_online"] === 'Yes' ? global.tab["customer_online"] = 1 : global.tab["customer_online"] = 0;
      global.tab["date"] = await dateFormat(global.tab["date"], "yyyy-mm-dd HH:MM:ss");
      await global.orders.push(parseInt(global.tab["id"]) + ';' + global.tab["order_id"] + ';' + '"' + global.tab["customer"].replace('\t', '') + '"' + ';' + global.tab["total"].trim() + ';' + global.tab["carrier"].replace('\t', '') + ';' + '"' + global.tab["date"].replace('\t', '') + '"' + ';' + global.tab["customer_online"]);
    }
  }

  async checkExportedFile() {
    await this.setDownloadBehavior();
    await this.downloadCart(ShoppingCart.export_carts_button);
    await this.checkFile(global.downloadFileFolder, global.exportCartFileName);
    await this.readFile(global.downloadFileFolder, global.exportCartFileName, 1000);
    await this.checkExportedFileInfo(1000);
    await this.waitForAndClick(ShoppingCart.reset_button);
  }

  async downloadCart(selector) {
    await this.waitForAndClick(selector);
    await this.waitFor(2000);
    let exportDate = await this.getCustomDate(0);
    let files = await fs.readdirSync(downloadFileFolder);
    for (let i = 0; i < files.length; i++) {
      if (files[i].includes('cart_' + exportDate)) {
        global.exportCartFileName = await files[i];
      }
    }
  }

  async checkFile(folderPath, fileName, wait = 0) {
    await fs.stat(folderPath + fileName, function (err, stats) {
      err === null && stats.isFile() ? global.existingFile = true : global.existingFile = false;
    });
    await this.waitFor(wait);
    await expect(global.existingFile).to.be.true;
  }

  async readFile(folderPath, fileName, wait = 0) {
    await fs.readFile(folderPath + fileName, {encoding: 'utf-8'}, function (err, data) {
      global.lineFile = data.split("\n");
    });
    await this.waitFor(wait);
    await expect(global.lineFile, "No data").to.be.not.empty
  }

  async checkExportedFileInfo(wait = 0) {
    await this.waitFor(wait);
    for (let i = 1; i < (global.lineFile.length - 1); i++) {
      await expect(global.lineFile[i]).to.be.equal(global.orders[i - 1])
    }
  }
}

module.exports = ShoppingCarts;
