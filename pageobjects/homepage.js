const {Builder, By, Key, until} = require('selenium-webdriver');
var BasePage = require('../pageobjects/basepage');
var webdriver = require('selenium-webdriver');
var Employee_Name;
var should = require("chai").should();


class HomePage extends BasePage{
    async log_in(){
        await driver.findElement(By.name('txtUsername')).sendKeys('Admin');
        await driver.findElement(By.name('txtPassword')).sendKeys('admin123', Key.ENTER);
    }
    async move_to_admin_page(){
        await driver.findElement(By.xpath('//*[@id="menu_admin_viewAdminModule"]/b')).click();
    }
    async go_to_add_page(){
        await driver.findElement(By.xpath('//*[@id="menu_admin_viewAdminModule"]/b')).click();
        await driver.findElement(By.id('btnAdd')).click();
    }
    async add_new_user(Username, password){
        await driver.findElement(By.xpath('//*[@id="systemUser_employeeName_empName"]')).sendKeys('a');
        Employee_Name = await driver.findElement(By.xpath('/html/body/div[4]/ul/li[1]')).getText();
        await driver.findElement(By.xpath('/html/body/div[4]/ul/li[1]')).click();
        await driver.findElement(By.id('systemUser_userName')).sendKeys(Username);
        await driver.findElement(By.id('systemUser_password')).sendKeys(password);
        await driver.findElement(By.id('systemUser_confirmPassword')).sendKeys(password);
        await driver.findElement(By.name('btnSave')).click();
        this.sleep_n_sec(3);
        await driver.findElement(By.name('btnSave')).click();
    }
    async search_for_user(Username){
        await driver.findElement(By.id('searchSystemUser_userName')).sendKeys(Username);
        await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[1]/div[2]/form/fieldset/ol/li[2]/select/option[3]')).click();
        await driver.findElement(By.id('searchSystemUser_employeeName_empName')).sendKeys(Employee_Name);
        await driver.findElement(By.id('searchBtn')).click();
    }
    async assertion_using_chai(Username){
        //assertion for username
        let pred_username = await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[2]/div/div/form/div[4]/table/tbody/tr/td[2]/a')).getText();
        pred_username.should.equal(Username);
        //assertion for user role
        let pred_user_role = await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[2]/div/div/form/div[4]/table/tbody/tr/td[3]')).getText();
        pred_user_role.should.equal('ESS');
        //assertion for Employee Name
        let pred_emp_name = await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[2]/div/div/form/div[4]/table/tbody/tr/td[4]')).getText();
        pred_emp_name.should.equal(Employee_Name);
    }
    async deletion_of_user(){
        await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[2]/div/div/form/div[4]/table/tbody/tr/td[1]/input')).click();
        await driver.findElement(By.id('btnDelete')).click();
        await driver.findElement(By.id('dialogDeleteBtn')).click();
    }
    async assertion_of_deletion(Username){
        let no_rec_message = await driver.findElement(By.xpath('/html/body/div[1]/div[3]/div[2]/div/div/form/div[4]/table/tbody/tr/td')).getText();
        no_rec_message.should.equal('No Records Found');
    }
}

module.exports = new HomePage();