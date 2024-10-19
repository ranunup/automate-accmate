export class MenuPO {

    static selectMenu(menuName: string) {
        cy.xpath(`//a[contains(@class, "nav-link")]/span[text()="${menuName}"]`).click();
    }
}