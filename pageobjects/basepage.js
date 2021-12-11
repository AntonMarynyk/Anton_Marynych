var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({implicit: (1000)});

class BasePage{
    constructor() {
        global.driver = driver;
    }
    async go_to_url(theURL){
        await driver.get(theURL);
    }
    sleep_n_sec(n){
        driver.sleep(n * 1000);
    }
}

module.exports = BasePage;