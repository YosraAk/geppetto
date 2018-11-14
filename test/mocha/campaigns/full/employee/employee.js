const {Menu} = require('../../../selectors/BO/menu');
const {Employee} = require('../../../selectors/BO/employee_page');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const authentication = require('../../common_scenarios/authentication');

scenario('Create employee', () => {
  authentication.signInBO('employee');
  scenario('Go to "Team" menu', client => {
    test('should go to "Team" menu', async () => {
      await client.closeSymfonyToolbar(CommonBO.symfony_toolbar_close_button, 2000);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.team_submenu, 1000);
    });
    test('should click on "Add new employee" button', () => client.waitForAndClick(Employee.new_employee_button));
    test('should set "First name" input', () => client.waitForAndSetValue(Employee.first_name_input, 'Demo'));
    test('should set "Last name" input', () => client.waitForAndSetValue(Employee.last_name_input, 'Prestashop'));
    test('should set "Email" input', () => client.waitForAndSetValue(Employee.email_input, 'demo' + dateTime + '@prestashop.com'));
    test('should set "Password" input', () => client.waitForAndSetValue(Employee.password_input, '123456789'));
    test('should choose "Permission profile" option', () => client.waitForAndSelect(Employee.profile_select, '4'));
    test('should click on "Save" button', () => client.waitForAndClick(Employee.save_button));
  }, 'common_client');

  scenario('Check the employee creation', client => {
    test('should search the created employee', () => client.waitForAndSetValue(Employee.email_search_input, 'demo' + dateTime + '@prestashop.com'));
    test('should click on "Search" button', () => client.waitForAndClick(Employee.search_button_team));
    test('should check the result', () => client.checkTextValue(Employee.search_result, "1"));
    test('should check that the "First name" of employee is equal to "Demo"', () => client.checkTextValue(Employee.team_employee_name, 'Demo', 'contain'));
    test('should check that the "Last name" of employee is equal to "Prestashop"', () => client.checkTextValue(Employee.team_employee_last_name, 'Prestashop', 'contain'));
    test('should check that the "Email" of employee is equal to " demo' + dateTime + '@prestashop.com)"', () => client.checkTextValue(Employee.team_employee_email, 'demo' + dateTime + '@prestashop.com', 'contain'));
    test('should check that the "Permission profile" of employee is equal to "Salesman"', () => client.checkTextValue(Employee.team_employee_profile, 'Salesman', 'contain'));
    test('should click on "Reset" button', () => client.waitForAndClick(Employee.reset_search_button));
    authentication.signOutBO();

  }, 'common_client', true);

  scenario('Delete an employee', () => {
    authentication.signInBO('employee');
    scenario('Delete an employee', client => {
      test('should go to "Team" menu', async () => {
        await client.closeSymfonyToolbar(CommonBO.symfony_toolbar_close_button, 2000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.team_submenu, 1000);
      });
      test('should search the created employee', () => client.waitForAndSetValue(Employee.email_search_input, 'demo' + dateTime + '@prestashop.com'));
      test('should click on "Search" button', () => client.waitForAndClick(Employee.search_button_team));
      test('should check the result', () => client.checkTextValue(Employee.search_result, "1"));
      test('should click dropdown-toggle button', () => client.waitForAndClick(Employee.dropdown_toggle));
      test('should click on "OK" button in the pop-up', () => client.confirmationDialog());
      test('should click on "Delete" link', () => client.waitForAndClick(Employee.delete_link));
      test('should check the result', () => client.checkTextValue(Employee.search_result, "0"));
      test('should click on "Reset" button', () => client.waitForAndClick(Employee.reset_search_button));
    }, 'common_client');
  }, 'common_client');
}, 'common_client', true);
