// test/core/flows.cjs
const { By, until } = require("selenium-webdriver");
const S = require("./selectors.js");
const H = require("./helpers.js");

async function goHome(driver) {
  await driver.get("https://www.technoshop.ba");
}

async function openCart(driver) {
  await H.clickCss(driver, S.home.cartLink);

  // State transition: HOME -> CART
  await driver.wait(async () => {
    const url = await driver.getCurrentUrl();
    return url.includes("kosarica") || url.includes("cart");
  }, 20000);

  return true;
}

async function goToCheckoutForm(driver) {
  // klik na "Nastavi" u košarici
  await H.waitCss(driver, S.checkout.cartContinueBtn);
  await H.clickCss(driver, S.checkout.cartContinueBtn);

  // sad smo na /blagajna
  await driver.wait(async () => {
    const url = await driver.getCurrentUrl();
    return url.includes("blagajna");
  }, 20000);

  // forma mora postojati
  await H.waitCss(driver, S.checkout.email);
}




async function search(driver, query) {
  const inputCss = S.home.searchInput;
  const submitCss = S.home.searchSubmit;

  if (await H.existsCss(driver, inputCss))
    await H.typeCss(driver, inputCss, query);

  if (await H.existsCss(driver, submitCss))
    await H.clickCss(driver, submitCss);
}

async function addProductToCart(driver) {
  await driver.get(
    "https://technoshop.ba/proizvodi/it-oprema/laptopi-i-racunari/acer-notebook-a315-59-76zh-41882"
  );

  const addBtn = await driver.wait(
    until.elementLocated(By.css(S.product.addToCartBtn)),
    20000
  );

  await driver.wait(until.elementIsVisible(addBtn), 20000);
  await driver.wait(until.elementIsEnabled(addBtn), 10000);

  // JS klik jer je <a> sa onclick handlerom
  await driver.executeScript("arguments[0].click();", addBtn);

  // čekaj da se korpa poveća
  await driver.wait(async () => {
    const count = await driver.executeScript(`
      const el = document.querySelector("#cartCount");
      return el && Number(el.textContent.trim()) > 0;
    `);
    return count === true;
  }, 20000);
}

module.exports = {
  goHome,
  openCart,
  search,
  addProductToCart,
  goToCheckoutForm
};
