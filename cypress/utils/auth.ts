import { Assert } from "./assert";
import { Locators } from "./locators";

export class Auth {
  static login(username: string, password: string, expectSuccess: boolean) {
    cy.visit("https://accmate.ourcompany.co.za/auth/login");
    cy.viewport(1920, 1280);

    cy.get(Locators.loginEmailInput).should("be.visible");
    cy.get(Locators.loginPasswordInput).should("be.visible");

    cy.get(Locators.loginEmailInput).type(username);
    cy.get(Locators.loginPasswordInput).type(password);

    cy.screenshot("/auth/login-page");

    cy.get(Locators.loginButton).click();

    if(expectSuccess) {
      Assert.dashboardVisible();
      cy.screenshot("/auth/login-success");
    }
  }

  static logout(username: string) {
    cy.get(`img[alt="${username}"]`).click();
    cy.xpath(Locators.logoutButton).click();
  }
}
