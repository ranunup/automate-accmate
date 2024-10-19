import { Locators } from "./locators";

export class ItemPO {
    static insertItem(name: string, salePrice: string, purchasePrice: string) {

        cy.get(Locators.nameInput).type(name);
        cy.get(Locators.salePriceInput).type(salePrice);
        cy.get(Locators.purchasePriceInput).type(purchasePrice);
        cy.screenshot("items/item-new");
    }
}