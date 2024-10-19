import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { FormPO } from "../../utils/formPO";
import { ItemPO } from "../../utils/itemPO";
import { ListPO } from "../../utils/listPO";
import { MenuPO } from "../../utils/menuPO";

describe("Test Items Feature", () => {
  before(() => {
        Auth.login("ranunup@gmail.com", "student@2024", true);
  });

  it(`
      login
      navigate to items and add new
      save form without required fields and verify errors are shown
      fill form and save
      verify item added to list
      duplicate Item and verify that more than one occurrence of it exists on the list
      delete one of the duplicates and confirm only one occurrence of item exists
    `, () => {

    // navigate to items and add new
    MenuPO.selectMenu("Items");
    ListPO.addNew();

    // verify you're on item form and save without inserting data
    Assert.titleVisible("New Item");
    FormPO.save();

    // verify required field errors are shown
    Assert.requiredFieldErrorVisible();
    cy.screenshot("items/item-required-fields");

    // insert item data
    ItemPO.insertItem("TI-001", "49.99", "20.25");

    // save item
    FormPO.save();

    // verify item added notification shown
    Assert.alertVisible("Item added!");
    cy.screenshot("items/item-added");

    // filter and duplicate item
    ListPO.filter("TI-001");
    ListPO.duplicate("TI-001");

    // verify item duplicated notification shown
    Assert.alertVisible("Item duplicated!");
    cy.screenshot("items/item-duplicated");

    // go back to items list
    MenuPO.selectMenu("Items");

    // filter for item and confirm more than one instance returned (proves item was successfully duplicated)
    ListPO.filter("TI-001");
    Assert.itemOccursNTimes("TI-001", 2);
    cy.screenshot("items/duplicate-items");

    // delete one of the items and confirm deletion
    ListPO.delete("TI-001", 1);
    Assert.alertVisible("TI-001 deleted!");
    cy.screenshot("items/item-deleted");

    // filter for item and confirm only one instance is returned (proves item was successfully deleted)
    ListPO.filter("TI-001");
    Assert.itemOccursNTimes("TI-001", 1);
    cy.screenshot("items/one-instance-of-item");
  });
});
