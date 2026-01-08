const { By, until } = require("selenium-webdriver");


async function waitCss(driver, css, timeout = 20000) {
  const el = await driver.wait(until.elementLocated(By.css(css)), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}


async function selectByIndex(driver, css, index = 1) {
  const select = await driver.findElement(By.css(css));
  const options = await select.findElements(By.css("option"));
  if (options.length > index) {
    await options[index].click();
  }
}

async function clickCss(driver, css, timeout = 20000) {
  const el = await waitCss(driver, css, timeout);
  await driver.executeScript("arguments[0].scrollIntoView({block:'center'});", el);
  await driver.executeScript("arguments[0].click();", el);
  return el;
}

async function typeCss(driver, css, value, timeout = 20000) {
  const el = await waitCss(driver, css, timeout);
  await el.clear();
  await el.sendKeys(value);
  return el;
}

async function textCss(driver, css) {
  return await driver.executeScript(`
    const el = document.querySelector(${JSON.stringify(css)});
    return el ? el.textContent.trim() : null;
  `);
}

async function existsCss(driver, css) {
  const els = await driver.findElements(By.css(css));
  return els.length > 0;
}

async function screenshot(driver, name) {
  const img = await driver.takeScreenshot();
  const fs = require("fs");
  fs.writeFileSync(`./test_artifacts/${name}.png`, img, "base64");
}

module.exports = { waitCss, clickCss, typeCss, textCss, existsCss, screenshot, selectByIndex };
