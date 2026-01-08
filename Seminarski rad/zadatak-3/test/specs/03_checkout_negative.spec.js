const { expect } = require("chai");
const { setup, teardown } = require("../core/setup.js");
const { By } = require("selenium-webdriver");
const S = require("../core/selectors.js");
const H = require("../core/helpers.js");
const D = require("../core/data.js");
const F = require("../core/flows.js");

let driver;

describe("CHECKOUT – NEGATIVNI SCENARIJI (EP + BVA)", function () {
  before(async function () { 
    driver = await setup(this); 
    await F.addProductToCart(driver);
  });
  after(async function () { await teardown(); });

  async function goToCheckoutOrSkip() {

  await F.addProductToCart(driver);

  await F.openCart(driver);

  const hasContinue = await H.existsCss(driver, S.checkout.continueBtn);
  if (!hasContinue) {
    throw new Error("Checkout dugme ne postoji iako proizvod postoji u korpi");
  }

  await H.clickCss(driver, S.checkout.continueBtn);
}


  it("TC-07: Prazan email", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);
    // SUBMIT
    const btn = await driver.wait(
      async () => {
        const els = await driver.findElements(By.css(S.checkout.checkoutButton));
        return els.length > 0 ? els[0] : false;
      },
      20000,
      "Checkout Nastavite button se nije pojavio"
    );
    // SCROLL
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      btn
    );
    // HARD JS CLICK
    await driver.executeScript("arguments[0].click();", btn);
    // SAMO DOKAZ DA JE KLIK IZVRŠEN
    await driver.sleep(2000);
  });



  it("TC-08: Email bez @ ", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    const urlBefore = await driver.getCurrentUrl();

    // OSNOVNI PODACI
    await H.typeCss(driver, S.checkout.name, D.valid.name);
    await H.typeCss(driver, S.checkout.email, D.invalid.emailNoAt); // ❌ bez @
    await H.typeCss(driver, S.checkout.phone, D.valid.phone9);

    // PAYMENT
    await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    // DELIVERY
    await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

    // SUBMIT
    await driver.sleep(1000);
    await H.clickCss(driver, S.checkout.checkoutButton);

    const urlAfter = await driver.getCurrentUrl();

    expect(urlAfter).to.equal(urlBefore);
  });

  it("TC-09: Telefon 8 cifara", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    // OSNOVNI PODACI
    await H.typeCss(driver, S.checkout.name, D.valid.name);
    await H.typeCss(driver, S.checkout.email, D.valid.email);
    await H.typeCss(driver, S.checkout.phone, D.invalid.phoneTooShort); // ❌ 8 cifara

    // PAYMENT
    await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    // DELIVERY
    await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

    // SUBMIT
    await driver.sleep(10000);
    await H.clickCss(driver, S.checkout.checkoutButton);

    // SERVER-SIDE ERROR
    const hasErr = await H.existsCss(driver, S.checkout.errorBox);
    expect(hasErr).to.equal(true);
  });

  it("TC-10: Telefon 20 cifara (01236123456789123112)", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    // OSNOVNI PODACI
    await H.typeCss(driver, S.checkout.name, D.valid.name);
    await H.typeCss(driver, S.checkout.email, D.valid.email);
    await H.typeCss(driver, S.checkout.phone, D.invalid.phoneTooLong); // ❌ 20 cifara

    // PAYMENT
    await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    // DELIVERY
    await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

    // SUBMIT
    await driver.sleep(1000);
    await H.clickCss(driver, S.checkout.checkoutButton);

    // SERVER-SIDE ERROR
    const hasErr = await H.existsCss(driver, S.checkout.errorBox);
    expect(hasErr).to.equal(true);
  });

  it("TC-11: Telefon sa slovima (061ABC)", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    // OSNOVNI PODACI
    await H.typeCss(driver, S.checkout.name, D.valid.name);
    await H.typeCss(driver, S.checkout.email, D.valid.email);
    await H.typeCss(driver, S.checkout.phone, D.invalid.phoneLetters); // ❌ sa slovima

    // PAYMENT
    await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    // DELIVERY
    await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

    // SUBMIT
    await driver.sleep(1000);
    await H.clickCss(driver, S.checkout.checkoutButton);

    // SERVER-SIDE ERROR
    const hasErr = await H.existsCss(driver, S.checkout.errorBox);
    expect(hasErr).to.equal(true);
  });

  it("TC-12: Ime sa brojevima i specijalnim znakovima (Luka123!!!!!!Hadzić!!!!)", async function () {
    await F.addProductToCart(driver);
    await F.openCart(driver);
    await F.goToCheckoutForm(driver);

    const urlBefore = await driver.getCurrentUrl();

    // OSNOVNI PODACI
    await H.typeCss(driver, S.checkout.name, D.invalid.name2);
    await H.typeCss(driver, S.checkout.email, D.valid.email);
    await H.typeCss(driver, S.checkout.phone, D.valid.phone9); 

    // PAYMENT
    await H.typeCss(driver, S.checkout.paymentName, D.invalid.name2);
    await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.paymentAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.paymentCity, 1);
    await H.selectByIndex(driver, S.checkout.paymentZip, 1);
    await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

    // DELIVERY
    await H.typeCss(driver, S.checkout.deliveryName, D.invalid.name2);
    await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
    await H.typeCss(driver, S.checkout.deliveryAddress, D.valid.address);
    await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
    await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

    // SUBMIT
    await driver.sleep(1000);
    await H.clickCss(driver, S.checkout.checkoutButton);

    const hasErr = await H.existsCss(driver, S.checkout.errorBox);
    expect(hasErr).to.equal(true);

  });

  it("TC-13: Adresa sa specijalnim znakovima (@@@!!!###$$$%%%^^^&&&***((())))", async function () {
      await F.addProductToCart(driver);
      await F.openCart(driver);
      await F.goToCheckoutForm(driver);

      const urlBefore = await driver.getCurrentUrl();

      // OSNOVNI PODACI
      await H.typeCss(driver, S.checkout.name, D.valid.name);
      await H.typeCss(driver, S.checkout.email, D.valid.email);
      await H.typeCss(driver, S.checkout.phone, D.valid.phone9); 

      // PAYMENT
      await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
      await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
      await H.typeCss(driver, S.checkout.paymentAddress, D.invalid.addressSpecial);
      await H.selectByIndex(driver, S.checkout.paymentCity, 1);
      await H.selectByIndex(driver, S.checkout.paymentZip, 1);
      await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

      // DELIVERY
      await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
      await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
      await H.typeCss(driver, S.checkout.deliveryAddress, D.invalid.addressSpecial);
      await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
      await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

      // SUBMIT
      await driver.sleep(1000);
      await H.clickCss(driver, S.checkout.checkoutButton);

      const hasErr = await H.existsCss(driver, S.checkout.errorBox);
      expect(hasErr).to.equal(true);

    });

     it("TC-14: Adresa kratka (jedno slovo)", async function () {
      await F.addProductToCart(driver);
      await F.openCart(driver);
      await F.goToCheckoutForm(driver);

      const urlBefore = await driver.getCurrentUrl();

      // OSNOVNI PODACI
      await H.typeCss(driver, S.checkout.name, D.valid.name);
      await H.typeCss(driver, S.checkout.email, D.valid.email);
      await H.typeCss(driver, S.checkout.phone, D.valid.phone9); 

      // PAYMENT
      await H.typeCss(driver, S.checkout.paymentName, D.valid.name);
      await H.typeCss(driver, S.checkout.paymentPhone, D.valid.phone9);
      await H.typeCss(driver, S.checkout.paymentAddress, D.invalid.addressTooShort);
      await H.selectByIndex(driver, S.checkout.paymentCity, 1);
      await H.selectByIndex(driver, S.checkout.paymentZip, 1);
      await H.selectByIndex(driver, S.checkout.paymentCountry, 1);

      // DELIVERY
      await H.typeCss(driver, S.checkout.deliveryName, D.valid.name);
      await H.typeCss(driver, S.checkout.deliveryPhone, D.valid.phone9);
      await H.typeCss(driver, S.checkout.deliveryAddress, D.invalid.addressTooShort);
      await H.selectByIndex(driver, S.checkout.deliveryCity, 1);
      await H.selectByIndex(driver, S.checkout.deliveryZip, 1);

      // SUBMIT
      await driver.sleep(1000);
      await H.clickCss(driver, S.checkout.checkoutButton);

      const hasErr = await H.existsCss(driver, S.checkout.errorBox);
      expect(hasErr).to.equal(true);

    });

 });
