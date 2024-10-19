export enum Locators {

  //login form
  loginEmailInput = 'input[data-name="email"]',
  loginPasswordInput = 'input[data-name="password"]',
  loginButton = 'button[type="submit"]',

  //dashboard user options
  logoutButton = '//a/span[text()="Logout"]',

  // item form
  nameInput = 'input[data-name="name"]',
  salePriceInput = 'input[data-name="sale_price"]',
  purchasePriceInput = 'input[data-name="purchase_price"]',

  // list page
  listFilterInput = 'input[placeholder="Search or filter results.."]',
  duplicateButton = '//div[contains(@class, "show")]/a[text()="Duplicate"]',
  editButton = '//div[contains(@class, "show")]/a[text()="Edit"]',
  deleteButton = '//div[contains(@class, "show")]/button[text()="Delete"]',
  addNewButton ='//a[text()="Add New"]',

  // modal
  modalDeleteButton = '//button/span[text()="Delete"]',

  // invoice form
  addCustomerButton = '//button/span[normalize-space()="Add a Customer"]',
  customerNameSearchInput = '//input[@placeholder="Type a Customer name"]',
  addItemButton = '//button[contains(.,"Add an Item")]',
  itemNameSearchInput = '//input[@placeholder="Type an item name"]',
  addPaymentButton = "#button-payment",
  newPaymentAmountInput = 'div[class="input-group-prepend"] ~ input[name="amount"]',
  paymentSaveButton = '//button[@type="button"]/span[text()="Save"]',

  // revenue form
  amountInput = 'input[name="amount"]',
  paymentMethodDropdown = 'input[placeholder="- Select Payment Method -"]',

  // account form
  accountNumberInput = 'input[name="number"]',
  openingBalanceInput = 'input[name="opening_balance"]',
  bankNameInput = 'input[name="bank_name"]',
  disableButton = '//label[contains(.,"Enabled")]/following-sibling::div//label[contains(@class, "btn-danger")]',
  moreActionsButton = '//button[contains(.,"More Actions")]'
}
