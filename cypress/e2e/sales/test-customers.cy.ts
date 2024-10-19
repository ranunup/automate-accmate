import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { FormPO } from "../../utils/formPO";
import { ListPO } from "../../utils/listPO";
import { Locators } from "../../utils/locators";
import { MenuPO } from "../../utils/menuPO";

describe("Test Customers Feature", () => {
  before(() => {
    Auth.login("ranunup@gmail.com", "student@2024", true);
  });

  it(`
    login and navigates to sales => customers
    add new instance
	  save form without inserting data and verify errors are thrown
    add customer name and save
    verify customer added
    `, () => {
    // navigate to sales invoices and add new
    goCustomers();
    ListPO.addNew();

    // verify you're on customer form and save without inserting data
    Assert.titleVisible("New Customer");
    FormPO.save();

    // verify required field errors are shown
    Assert.requiredFieldErrorVisible();
    cy.screenshot("customer/customer-required-fields");

    // insert customer name, save and confirm success
    FormPO.cssInsert(Locators.nameInput, "AutoTest-Customer");
    FormPO.save();
    Assert.alertVisible("Customer added!");
    cy.screenshot("customer/customer-added");
  });
});

const goCustomers = () => {
  MenuPO.selectMenu("Sales");
  MenuPO.selectMenu("Customers");
};

