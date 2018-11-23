const install = require('../common_scenarios/install');
const {Install} = require('../../selectors/install');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10105
 */
scenario('PR-10105: Install shop with Bosnian language', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10105');
    });
    test('should go to the install page', async () => {
      await client.openShopURL(global.installFolderName);
      await client.waitFor(5000);
    });
    test('should get selected language', async () => {
      await client.getSelectedValue(Install.StepOne.installation_language_installation_select, 'bs');
    });
    test('should install the step one', async () => {
      await install.installStepOne('bs', selectedValue, client);
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
      await install.installStepFive(client, '10105');
    });
    test('should install the step six', async () => {
      await install.installStepSix(client);
    });
  }, 'common_client');
}, 'common_client', true);
