import { Assert } from "./assert";
import { Locators } from "./locators";

export class ListPO {
    // clicks add new button
  static addNew() {
    cy.xpath(Locators.addNewButton).click();
  }

  // filters for list item
  static filter(filterText: string) {
    // filter for text
    cy.get(Locators.listFilterInput).type(`${filterText}{enter}`);
    // filtered text should be visible
    cy.xpath(`//td/a[contains(., "${filterText}")]`).should("be.visible");
  }

  // duplicates list item
  static duplicate(itemToDup: string) {

    this.clickRowAction(itemToDup);
    cy.xpath(Locators.duplicateButton).click();
  }

  // edits list item
  static edit(itemToEdit: string) {

    this.clickRowAction(itemToEdit);
    cy.xpath(Locators.editButton).click();
  }
  // initiates delete on row item
  static delete(itemToDel: string, index?: number) {
    this.clickRowAction(itemToDel, index);
    cy.xpath(Locators.deleteButton).click();
    cy.screenshot("/list/list-item-deletion");

    this.confirmDeletion();
  }

  // confirms deletion
  static confirmDeletion() {
    Assert.confirmationModalVisible();
    cy.xpath(Locators.modalDeleteButton).click();
  }

  // clicks row ellipsis
  static clickRowAction(itemTitle: string, index?: number) {      
    const element = this.resolveItem(`//a[text()="${itemTitle}"]/parent::td/following-sibling::td//a/i[contains(@class, "fa-ellipsis-h")]`, index);
    
    element.click();
  }

  // determine whether index exists, if so return item at index, else return item
  private static resolveItem(locator: string, index?: number) {
    return index!==null && index !==undefined ? cy.xpath(locator).eq(index) : cy.xpath(locator);
  }

  static selectListItem(itemName: string) {
    cy.xpath(`//td/a[text()="${itemName}"]`).click();
  }
}
