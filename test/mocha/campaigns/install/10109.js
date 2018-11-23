const install = require('../common_scenarios/install');
const {Install} = require('../../selectors/install');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10109
 */

scenario('PR-10109: Install shop with Hindi language', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10109');
    });
    test('should go to the install page', async () => {
      await client.openShopURL(global.installFolderName);
      await client.waitFor(5000);
    });
    test('should get selected language', async () => {
      await client.getSelectedValue(Install.StepOne.installation_language_installation_select, 'hi');
    });
    test('should install the step one', async () => {
      await install.installStepOne('hi', selectedValue, client);
    });

    test('should install the step two', async () => {
      await install.installStepTwo(client);
    });
    test('should install the step three', async () => {
      await install.installStepThree(client);
    });
    test('should install the step four', async () => {
      await install.installStepFour(client);
    });
    test('should install the step five', async () => {
      await install.installStepFive(client, '10109');
    });
    test('should install the step six', async () => {
      await install.installStepSix(client);
    });

  }, 'common_client');
}, 'common_client', true);
