import { Assert } from "./assert";
import { FormPO } from "./formPO";
import { Locators } from "./locators";
import { MenuPO } from "./menuPO";

export class InvoicePO {
  static goToInvoices() {
    MenuPO.selectMenu("Sales");
    MenuPO.selectMenu("Invoices");
  }

  static addCustomer(customerName: string) {
    cy.xpath(Locators.addCustomerButton).click();
    cy.xpath(Locators.customerNameSearchInput).type(customerName);
    FormPO.selectOption(customerName);
    Assert.textIsVisible("Choose a different customer");
    cy.screenshot("invoice/successful-customer-selection");
  }

  static addItem(itemName: string) {
    cy.xpath(Locators.addItemButton).click();
    cy.xpath(Locators.itemNameSearchInput).type(itemName);
    FormPO.selectItem(itemName);
    cy.screenshot("invoice/item-selection");
  }

  static addPayment(amount?: string) {
    cy.get(Locators.addPaymentButton).click();
    if (amount) {
      cy.get(Locators.newPaymentAmountInput).should("be.visible");
      cy.get(Locators.newPaymentAmountInput).clear();
      cy.get(Locators.newPaymentAmountInput).type(amount);
    }
    cy.wait(2000);
    cy.xpath(Locators.paymentSaveButton).click();
  }
}
