const { expect } = require("chai");
const { setup, teardown } = require("../core/setup.js");
const { By, until } = require("selenium-webdriver");

const S = require("../core/selectors.js");
const H = require("../core/helpers.js");
const F = require("../core/flows.js");

let driver;

describe("SEARCH & FILTER – TechnoShop", function () {

  before(async function () {
    driver = await setup(this);
  });

  after(async function () {
    await teardown();
  });

  it("TC-16: Search bar postoji i aktivan je", async function () {
    const exists = await H.existsCss(driver, S.search.box);
    expect(exists).to.equal(true);
  });


  
  it("TC-17: Pretraga sa validnim pojmom (Laptop)", async function () {

    
    await driver.get("https://technoshop.ba");

    
    await driver.executeScript(() => {
      const input = document.querySelector('#search');
      input.value = 'Laptop';
    });

    
    await driver.executeScript(() => {
      document.querySelector('img.srch').click();
    });

    
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('pretraga=');
    }, 20000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include('pretraga=');
  });





  it("TC-18: Pretraga sa praznim unosom", async function () {
    await driver.get("https://technoshop.ba");

    const startUrl = await driver.getCurrentUrl();

    await H.clickCss(driver, S.search.submit);
    await driver.sleep(2000);

    const endUrl = await driver.getCurrentUrl();

    
    expect(endUrl).to.equal(startUrl);
  });




    it("TC-19: Pretraga sa specijalnim znakovima (@@@!!!###//)", async function () {
        this.timeout(30000);

        await H.typeCss(driver, S.search.input, "@@@!!!###//");
        await H.clickCss(driver, S.search.submit);

        
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes("pretraga") || url.includes("proizvodi") || url.includes("search");
        }, 20000);

        
        const url = await driver.getCurrentUrl();

        
        expect(url).to.not.satisfy(u =>
            u.includes("pretraga") || u.includes("proizvodi") || u.includes("search"));
    });

});
