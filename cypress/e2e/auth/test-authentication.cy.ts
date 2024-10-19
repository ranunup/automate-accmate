import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { FormPO } from "../../utils/formPO";
import { Locators } from "../../utils/locators";

describe("Test Authentication Feature", () => {
  it(`
    login with invalid credentials and verify login unsuccessful
    login with valid credentials and confirm successful login
    logout
    `, () => {
    // login
    Auth.login("ranunup@gmail.com", "student@2025", false);
    Assert.errorIsVisible("These credentials do not match our records.");
    cy.screenshot("auth/login-failure");

    FormPO.cssInsert(Locators.loginPasswordInput, "student@2024", true);

    cy.get(Locators.loginButton).click();

    Assert.dashboardVisible();

    cy.screenshot("auth/login-success");

    Auth.logout("Ranunu");    
    Assert.textIsVisible("Login to start your session");
    cy.screenshot("auth/logout-success");

  });
});
