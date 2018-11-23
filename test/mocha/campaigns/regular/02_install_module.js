const {ModulePage} = require('../../selectors/BO/module/module_page');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const moduleScenarios = require('../common_scenarios/module/module');
const onBoarding = require('../common_scenarios/onboarding');
const authentication = require('../common_scenarios/authentication');

/**
 * If there is no module to install, return immediately.
 */
if (global.test_addons) {
  return;
}

scenario('Install and Uninstall Module from cross selling', () => {
  authentication.signInBO('installModule');
  onBoarding.closeOnBoardingModal();
  scenario('Check then uninstall "ps_mbo" module', client => {
    moduleScenarios.checkMboModule(client, ModulePage, AddProduct, "ps_mbo", "Uninstall");
  }, 'module/module');

  scenario('Install "' + module_tech_name + '" From Cross selling', client => {
    moduleScenarios.installModule(client, ModulePage, AddProduct, module_tech_name);
  }, 'module/module');
  scenario('Check Configuration page of "' + module_tech_name + '"', client => {
    moduleScenarios.checkConfigPage(client, ModulePage, module_tech_name);
  }, 'module/module');
  scenario('Disable Module "' + module_tech_name + '"', client => {
    moduleScenarios.disableModule(client, ModulePage, AddProduct, module_tech_name);
  }, 'module/module');
  scenario('Disable Module "' + module_tech_name + '"', client => {
    moduleScenarios.enableModule(client, ModulePage, AddProduct, module_tech_name);
  }, 'module/module');
  scenario('Uninstall "' + module_tech_name + '"', client => {
    moduleScenarios.uninstallModule(client, ModulePage, AddProduct, module_tech_name);
  }, 'module/module');
  scenario('Check then install  "ps_mbo" module', client => {
    moduleScenarios.checkMboModule(client, ModulePage, AddProduct, "ps_mbo", "Install");
  }, 'module/module');
}, 'module/module', true);
