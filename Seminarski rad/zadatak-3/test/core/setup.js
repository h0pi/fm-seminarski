const { Builder, By, until, Browser } = require("selenium-webdriver");

let driver;

async function setup(context) {
  context.timeout(40000);

  driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();

  await driver.get("https://www.technoshop.ba");
  await driver.manage().window().maximize();

 try {
  await driver.executeScript(`
    if (typeof CookieConsentAgree === 'function') {
      CookieConsentAgree();
    }
  `);
} catch (e) {
  // cookie nije kritičan – IGNORIŠI
}
  return driver;
}

async function teardown() {
  try {
    if (driver) {
      await driver.quit();
    }
  } catch (e) {
    // ignoriši ako je session već zatvoren
  }
}

module.exports = { setup, teardown };
