import { Assert } from "../../utils/assert";
import { Auth } from "../../utils/auth";
import { DashboardPO } from "../../utils/dashboardPO";
import { FormPO } from "../../utils/formPO";
import { InvoicePO } from "../../utils/invoicePO";
import { ListPO } from "../../utils/listPO";
import { MenuPO } from "../../utils/menuPO";
import { Utils } from "../../utils/utils";

describe("Test Invoices Feature", () => {
  let invoiceNumber: string;
  let totalIncome = 0;
  let totalProfit = 0;
  let openInvoices = 0;
  let openProfit = 0;

  before(() => {
    Auth.login("ranunup@gmail.com", "student@2024", true);
  });

  it(`
    login and navigates to sales invoices
	  create new invoice
    add customer and item
    save and verify invoice is in draft status

    navigate to dashboard and get amounts
	  partially pay invoice and verify status changed to partial
    verify partial payment reflects on dashboard totals and outstanding amounts
	  settle invoice and verify status changed to paid
    verify no open amounts are reflected on the dashboard
    `, () => {
    // navigate to sales invoices and add new
    InvoicePO.goToInvoices();
    ListPO.addNew();

    // verify you're on invoice form
    Assert.titleVisible("New Invoice");

    // add customer
    InvoicePO.addCustomer("AutoTest-Customer");

    //add item and save
    InvoicePO.addItem("TI-001");
    FormPO.save();
    cy.screenshot("invoice/draft-invoice-added");

    // verify current invoice status
    Assert.currentStatus("Draft");
    Assert.alertVisible("Invoice added!");
    cy.screenshot("invoice/invoice-draft-status");

    // get invoice number for later use
    FormPO.getValueOf("Invoice Number:").then((invNumber: any) => {
      invoiceNumber = invNumber;

      // go to dashboard and get current income and profit
      DashboardPO.goToDashboard();

      // get total profit
      FormPO.getValueOf("Total Profit").then((totProfit: any) => {
        totalProfit = Utils.sanitizeDashboardTotalValue(totProfit);

        // get total income
        FormPO.getValueOf("Total Income").then((totIncome: any) => {
          totalIncome = Utils.sanitizeDashboardTotalValue(totIncome);

          // get open income and confirm it's 0
          FormPO.getValueOf("Receivables").then((receivables: any) => {
            assert.equal(openInvoices, Utils.sanitizeDashboardOpenValue(receivables));
            openInvoices = Utils.sanitizeDashboardOpenValue(receivables);

            // get open profit and confirm it's 0
            FormPO.getValueOf("Upcoming").then((upcoming: any) => {
              assert.equal(openProfit, Utils.sanitizeDashboardOpenValue(upcoming));
              openProfit = Utils.sanitizeDashboardOpenValue(upcoming);

              cy.screenshot("invoice/totals-before-invoice-sent");

              // navigate to Invoices
              InvoicePO.goToInvoices();
              selectInvoice(invNumber);

              // add partial payment, confirm success and change of status
              const partialAmount = ".10";
              InvoicePO.addPayment(partialAmount);
              Assert.alertVisible("Payment added!");
              Assert.currentStatus("Partial");
              cy.screenshot("invoice/add-partial-payment");

              // go to dashboard and get current open amounts
              // verify total income and profit include open amounts
              DashboardPO.goToDashboard();
              FormPO.getValueOf("Receivables").then(
                (updatedReceivables: any) => {
                  openInvoices = Utils.sanitizeDashboardOpenValue(updatedReceivables);

                  FormPO.getValueOf("Upcoming").then((updatedUpcoming: any) => {
                    openProfit = Utils.sanitizeDashboardOpenValue(updatedUpcoming);

                    //verify current total income = previous total income plus receivable (i.e. invoice amount has been added) + partial amount
                    FormPO.getValueOf("Total Income").then(
                      (updatedTotIncome) => {
                        totalIncome =
                          totalIncome + openInvoices + +partialAmount;
                        assert.equal(
                          totalIncome,
                          Utils.sanitizeDashboardTotalValue(updatedTotIncome)
                        );

                        //verify current total profit= previous total profit plus upcoming (i.e. invoice amount has been added) + partial amount
                        FormPO.getValueOf("Total Profit").then(
                          (updatedTotProfit) => {
                            totalProfit =
                              totalProfit + openProfit + +partialAmount;
                            assert.equal(
                              totalProfit,
                              Utils.sanitizeDashboardTotalValue(updatedTotProfit)
                            );
                            cy.screenshot("invoice/partially-updated-totals");

                            // navigate to invoices, select and fully pay invoice
                            InvoicePO.goToInvoices();
                            selectInvoice(invNumber);
                            InvoicePO.addPayment();

                            // verify invoice status is fully paid
                            Assert.alertVisible("Payment added!");
                            Assert.currentStatus("Paid");
                            cy.screenshot("invoice/settle-payment");

                            // go to dashboard and verify no open amounts 
                            DashboardPO.goToDashboard();
                            FormPO.getValueOf("Receivables").then(
                                (receivableAmt: any) => {
                                  openInvoices = Utils.sanitizeDashboardOpenValue(receivableAmt);
                                  FormPO.getValueOf("Upcoming").then((upcomingAmt: any) => {
                                    openProfit = Utils.sanitizeDashboardOpenValue(upcomingAmt);

                                    assert.equal(openInvoices, 0);
                                    assert.equal(openProfit, 0);
                                });
                            });
                          }
                        );
                      }
                    );
                  });
                }
              );
            });
          });
        });
      });
    });
  });
});

const selectInvoice = (invoiceNumber: string) => {
    ListPO.selectListItem(invoiceNumber);
    Assert.titleVisible(`Invoice: ${invoiceNumber}`);
};