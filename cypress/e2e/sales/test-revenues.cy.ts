import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { DashboardPO } from "../../utils/dashboardPO";
import { FormPO } from "../../utils/formPO";
import { ListPO } from "../../utils/listPO";
import { Locators } from "../../utils/locators";
import { MenuPO } from "../../utils/menuPO";
import { Utils } from "../../utils/utils";

describe("Test Sales Revenues Feature", () => {
  beforeEach(() => {
    Auth.login("ranunup@gmail.com", "student@2024", true);
  });

  it(`
    login and get current total income and profit values
    navigate to sales => revenues
    add new instance
    add revenue amount
    save and verify revenue added to list
    navigate to the dashboard and verify that current totals have increased (by revenue amount)
    `, () => {
    let totalIncome = 0;
    let totalProfit = 0;
    const revenueAmount = "50000.00";

    // go to dashboard and get current income and profit
    DashboardPO.goToDashboard();

    // get total profit
    FormPO.getValueOf("Total Profit").then((totProfit: any) => {
      totalProfit = Utils.sanitizeDashboardTotalValue(totProfit);

      // get total income
      FormPO.getValueOf("Total Income").then((totIncome: any) => {
        totalIncome = Utils.sanitizeDashboardTotalValue(totIncome);
        cy.screenshot("revenue/initial-profits");

        // navigate to sales revenues and add new
        goToRevenues();
        ListPO.addNew();

        // verify you're on the revenue form
        Assert.titleVisible("New Revenue");

        // insert revenue amount, save and confirm success
        FormPO.cssInsert(Locators.amountInput, revenueAmount);
        cy.screenshot("revenue/cash-revenue");
        FormPO.save();
        // Assert.alertVisible("Revenue added!");
        cy.screenshot("revenue/cash-revenue-added");

        DashboardPO.goToDashboard();

        FormPO.getValueOf("Total Profit").then((newTotProfit: any) => {

            let newTotalProfit = Utils.sanitizeDashboardTotalValue(newTotProfit);
            
          FormPO.getValueOf("Total Income").then((newTotIncome: any) => {
            let newTotalIncome = Utils.sanitizeDashboardTotalValue(newTotIncome);

            // verify that new total profit is old total profit plus revenue amount
            assert.equal(newTotalProfit, totalProfit + parseFloat(revenueAmount));

            // verify that new total income is old total income plus revenue amount
            assert.equal(newTotalIncome, totalIncome + parseFloat(revenueAmount));

          });
        });
      });
    });
  });


  it(`    
    login and get current total income and profit values
    navigate to sales => revenues
    add new instance
    add fill form and change payment method to bank transfer
    save and verify revenue added to list
    navigate to the dashboard and verify that current totals have increased (by revenue amount)

    `, () => {
    let totalIncome = 0;
    let totalProfit = 0;
    const revenueAmount = "70000.00";

    // go to dashboard and get current income and profit
    DashboardPO.goToDashboard();

    // get total profit
    FormPO.getValueOf("Total Profit").then((totProfit: any) => {
      totalProfit = Utils.sanitizeDashboardTotalValue(totProfit);

      // get total income
      FormPO.getValueOf("Total Income").then((totIncome: any) => {
        totalIncome = Utils.sanitizeDashboardTotalValue(totIncome);
        cy.screenshot("revenue/initial-profits");

        // navigate to sales revenues and add new
        goToRevenues();
        ListPO.addNew();

        // verify you're on the revenue form
        Assert.titleVisible("New Revenue");

        // insert revenue amount, save and confirm success
        FormPO.cssInsert(Locators.amountInput, revenueAmount);
        FormPO.selectDropdownItem(Locators.paymentMethodDropdown, "Bank Transfer")
        cy.screenshot("revenue/bank-transfer-revenue");
        FormPO.save();
        // Assert.alertVisible("Revenue added!");
        cy.screenshot("revenue/bank-transfer-revenue-added");

        DashboardPO.goToDashboard();

        FormPO.getValueOf("Total Profit").then((newTotProfit: any) => {

            let newTotalProfit = Utils.sanitizeDashboardTotalValue(newTotProfit);
            
          FormPO.getValueOf("Total Income").then((newTotIncome: any) => {
            let newTotalIncome = Utils.sanitizeDashboardTotalValue(newTotIncome);

            // verify that new total profit is old total profit plus revenue amount
            assert.equal(newTotalProfit, totalProfit + parseFloat(revenueAmount));

            // verify that new total income is old total income plus revenue amount
            assert.equal(newTotalIncome, totalIncome + parseFloat(revenueAmount));

          });
        });
      });
    });
  });
});

const goToRevenues = () => {
  MenuPO.selectMenu("Sales");
  MenuPO.selectMenu("Revenues");
};
