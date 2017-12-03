// Related to the webdriver
const {Builder, promise, By, until} = require('selenium-webdriver');
require('chromedriver');

// Settings
const settings = {
  appRootUrl: 'http://localhost:3000'
};

// Global Config
jest.setTimeout(10 * 1000);
promise.USE_PROMISE_MANAGER = false;

const helpers = (driver, settings) => {
  const waitForPresent = async (cssSelector) => await driver.wait(until.elementLocated(
    By.css(cssSelector)
  ));

  const click = async (cssSelector) => {
    const clickable = await waitForPresent(cssSelector);
    await clickable.click();
  };

  const go = async (url) => {
    return await driver.get(settings.appRootUrl + url);
  };

  const setValue = async (cssSelector, value) => {
    const field = await waitForPresent(cssSelector);
    await field.clear();
    await field.sendKeys(value);
  };

  const getText = async (cssSelector) => {
    const elem = await waitForPresent(cssSelector);
    return await elem.getText();
  };

  const getAttr = async (cssSelector, attr) => {
    const elem = await waitForPresent(cssSelector);
    return elem.getAttribute(attr);
  };

  const setIncorrectCsrfToken = async () => {
    await driver.executeAsyncScript((cb) => {
      document.getElementsByName("_csrf")
        .forEach(tokenField => tokenField.value = "incorrect");
      cb();
    });
  };

  return {
    waitForPresent,
    click,
    go,
    setValue,
    getText,
    getAttr,
    setIncorrectCsrfToken
  };

};

module.exports = testCase => async() => {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.get(settings.appRootUrl + "/reset");
  await driver.get(settings.appRootUrl);
  await testCase(helpers(driver, settings));
  driver.quit();
};