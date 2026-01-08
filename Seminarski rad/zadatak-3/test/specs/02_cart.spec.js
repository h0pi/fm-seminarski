const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const { setup, teardown } = require("../core/setup.js");
const S = require("../core/selectors.js");
const H = require("../core/helpers.js");
const F = require("../core/flows.js");

let driver;

describe("KORPA – TechnoShop", function () {
  before(async function () { 
    driver = await setup(this); 
    await F.addProductToCart(driver); 
  });
  after(async function () { await teardown(); });

  it("TC-04: Otvaranje korpe – ako je prazna, count je 0", async function () {
    await F.openCart(driver);
    const count = await H.textCss(driver, S.home.cartCount);
    expect(Number(count)).to.be.greaterThan(0);
  });


    it("TC-05: Ne dozvoljava negativan unos količine", async function () {
        this.timeout(30000);
        await F.addProductToCart(driver);
        await F.openCart(driver);

        const hasQty = await H.existsCss(driver, S.cart.qtyInput);
        if (!hasQty) //this.skip();

        for (let i = 0; i < 5; i++) {
            await H.clickCss(driver, S.cart.qtyMinus);
            await driver.sleep(200); 
        }

        const qty = await H.waitCss(driver, S.cart.qtyInput);
        const value = parseInt(await qty.getAttribute("value"), 10);

        expect(value).to.be.at.least(1);
    });



    it("TC-06: Remove dugme uklanja stavku ", async function () {
        this.timeout(30000);
        await F.openCart(driver);

        const hasRemove = await H.existsCss(driver, S.cart.removeBtn);
        if (!hasRemove) throw new Error("Remove button nije pronađen - selector nije dobar ili korpa prazna");

        await H.clickCss(driver, S.cart.removeBtn);

        await driver.sleep(2000);

        const count = await H.textCss(driver, S.home.cartCount);
        expect(count.trim()).to.equal("0");
    });

});
