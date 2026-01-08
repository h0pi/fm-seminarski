const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const { setup, teardown } = require("../core/setup.js");
const S = require("../core/selectors.js");
const H = require("../core/helpers.js");
const D = require("../core/data.js");
const F = require("../core/flows.js");

let driver;

describe("CHECKOUT – POZITIVNI SCENARIJI", function () {

  before(async function () {
    driver = await setup(this);
    await F.addProductToCart(driver);
  });

  after(async function () {
    await teardown();
  });

  it("TC-15: Checkout sa svim validnim podacima", async function () {
    
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    
    await H.typeCss(driver, S.checkout.name, D.valid.name);
    await H.typeCss(driver, S.checkout.email, D.valid.email);
    await H.typeCss(driver, S.checkout.phone, D.valid.phone9);

    
    await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);

    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    
    await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);

    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

  
    const btn = await driver.findElement(By.css(S.checkout.checkoutButton));
    await driver.executeScript(
      "arguments[0].scrollIntoView({block:'center'});",
      btn
    );
    await driver.executeScript("arguments[0].click();", btn);

    
    const hasError = await H.existsCss(driver, S.checkout.errorBox);
    expect(hasError).to.equal(false);
  });

});
