
export class FormPO {
  static save() {
    cy.xpath(`//button[@type="submit"]/span[text()="Save"]`).click();
  }

  static selectOption(option: string) {
    cy.xpath(
      `//div[@class="aka-select-menu-option" and contains(.,"${option}")]`
    ).click();
  }

  static selectItem(item: string) {
    cy.xpath(
      `//div[contains(@class,"item-select-column") and contains(.,"${item}")]`
    ).click({ force: true });
  }

  static getValueOf(title: string) {
    return cy
      .xpath(`//*[normalize-space()="${title}"]/following-sibling::span`)
      .eq(0)
      .invoke("text");
  }

  static cssInsert(locator: string, value: string, clear?: boolean) {
    if (clear) {
      cy.get(locator).clear();
    }
    cy.get(locator).type(value);
  }

  static clickByCss(locator: string, force?: boolean) {
    cy.get(locator).click({force});
  }

  static clickByXpath(locator: string, force?: boolean) {
    cy.xpath(locator).click({force});
  }

  static selectDropdownItem(locator: string, option: string) {
    cy.get(locator).click().then(() => {
      cy.xpath(`//li[@class="el-select-dropdown__item" and contains(.,"${option}")]`).click();
    });
  }

  static duplicateRecord() {
    cy.xpath('//a[normalize-space()="Duplicate"]').click();
  }
}
