export class Assert {
  static dashboardVisible() {
    cy.xpath('//h2[text()="Dashboard"]').should("be.visible");
  }

  static textIsVisible(text: string) {
    cy.xpath(`//*[normalize-space()="${text}"]`).should("be.visible");
  }

  static titleVisible(title: string) {
    cy.xpath(`//h2[text()="${title}"]`).should("be.visible");
  }

  static requiredFieldErrorVisible() {
    cy.xpath(
      `//div[contains(@class, "invalid-feedback") and contains(., "field is required")]`
    ).should("be.visible");
  }

  static alertVisible(alertText: string) {
    cy.xpath(`//span[@class="alert-text"]/span[text()="${alertText}"]`).should(
      "be.visible"
    );
  }

  static itemOccursNTimes(listItem: string, occurrences: number) {
    cy.xpath(`//td/a[contains(., "${listItem}")]`).should(
      "have.length",
      occurrences
    );
  }

  static confirmationModalVisible() {
    cy.xpath(`//div[@class="modal-body" and contains(., "Confirm delete")]`);
  }

  static currentStatus(status: string) {
    cy.xpath(
      `//div[contains(.,"Status")]//span[contains(@class, "badge") and normalize-space()="${status}"]`
    ).should("be.visible");
  }

  static errorIsVisible(error: string) {
    cy.xpath(`//div[contains(@class,"alert-danger") and text()="${error}"]`).should('be.visible');
  }
}
