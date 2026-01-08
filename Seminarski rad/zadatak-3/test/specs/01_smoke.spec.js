const { expect } = require("chai");
const { setup, teardown } = require("../core/setup.js");
const S = require("../core/selectors.js");
const H = require("../core/helpers.js");

let driver;

describe("SMOKE – TechnoShop", function () {
  before(async function () { driver = await setup(this); });
  after(async function () { await teardown(); });

  it("TC-01: Početna stranica se učitava", async function () {
    const body = await H.waitCss(driver, S.home.body);
    expect(body).to.exist;
  });

  it("TC-02: Brojač korpe postoji", async function () {
    const count = await H.textCss(driver, S.home.cartCount);
    expect(count).to.not.equal(null);
  });

  it("TC-03: Otvaranje korpe radi", async function () {
    await driver.sleep(1000); 
    await H.clickCss(driver, S.home.cartLink);

    await driver.wait(async () => {
        const url = await driver.getCurrentUrl();
        return url.includes("kosarica") || url.includes("cart");
    }, 20000);

    const url = await driver.getCurrentUrl();
    expect(url).to.satisfy(u =>
        u.includes("kosarica") || u.includes("cart")
    );
});
    // it("TC-04: Footer postoji", async function () {
    //     const footer = await H.waitCss(driver, "footer");
    //     expect(footer).to.exist;
    // });

});
