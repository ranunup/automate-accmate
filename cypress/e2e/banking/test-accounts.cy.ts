import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { FormPO } from "../../utils/formPO";
import { ListPO } from "../../utils/listPO";
import { Locators } from "../../utils/locators";
import { MenuPO } from "../../utils/menuPO";

describe("Test Accounts Feature", () => {
  before(() => {
    Auth.login("ranunup@gmail.com", "student@2024", true);
  });

  it(`
    login and navigate to banking => accounts
    add new instance
    fill in required fields and save
    verify account added

    duplicate and verify duplicated
    rename and disable duplicate
    search for original account and update its amount

    go back to list and
    search for duplicate account, delete it and confirm deletion
    `, () => {
    // navigate to sales invoices and add new
    goAccounts();
    ListPO.addNew();

    // verify you're on customer form and save without inserting data
    Assert.titleVisible("New Account");

    // insert revenue amount, save and confirm success
    FormPO.cssInsert(Locators.nameInput, "AutoTestAccount");
    FormPO.cssInsert(Locators.accountNumberInput, "9876543210123");
    FormPO.cssInsert(Locators.openingBalanceInput, "5000.00");
    FormPO.cssInsert(Locators.bankNameInput, "Bank of Automation");
    cy.screenshot("banking/new-account-details");

    // save and verify account added
    FormPO.save();
    Assert.alertVisible("Account added!");
    cy.screenshot("banking/account-added");

    // duplicate account
    FormPO.clickByXpath(Locators.moreActionsButton);
    FormPO.duplicateRecord();
    Assert.alertVisible("Account duplicated!");
    cy.screenshot("banking/account-duplicated");

    // update and disable duplicate
    FormPO.cssInsert(Locators.nameInput, "AutoTestDuplicateAccount", true);
    FormPO.clickByXpath(Locators.disableButton);
    cy.screenshot("banking/disable-account-duplicate");
    FormPO.save();
    Assert.alertVisible("AutoTestDuplicateAccount updated!");
    cy.screenshot("banking/duplicate-account-disabled");


    // go to accounts list
    MenuPO.selectMenu("Accounts");
    // filter and duplicate item
    ListPO.filter("AutoTestAccount");
    ListPO.edit("AutoTestAccount");
    // verify you're on edit mode
    Assert.titleVisible("Edit Account");
    FormPO.cssInsert(Locators.openingBalanceInput, "150000.00", true);
    cy.screenshot("banking/edit-account");
    FormPO.save();
    Assert.alertVisible("AutoTestAccount updated!");

    // go to accounts list
    MenuPO.selectMenu("Accounts");
    // filter and delete disabled account
    ListPO.filter("AutoTestDuplicateAccount");
    ListPO.delete("AutoTestDuplicateAccount");
    cy.screenshot("banking/duplicate-account-deleted");
  });
});

const goAccounts = () => {
  MenuPO.selectMenu("Banking");
  MenuPO.selectMenu("Accounts");
};
