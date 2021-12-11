const homepage = require('../pageobjects/homepage');
const baseurl = 'https://opensource-demo.orangehrmlive.com/';
var username = 'test19';
describe("Test", function (){
    this.timeout(50000);
    it('login test', async function(){
        await homepage.go_to_url(baseurl);
        await homepage.log_in();
    });
    it('move to add page test', async function(){
        await homepage.go_to_add_page();
    });
    it('add new user test', async function(){
        await homepage.add_new_user(username, '12345678');
    });
    it('search for user', async function (){
       await homepage.search_for_user(username);
    });
    it('assertion using chai', async function (){
        await homepage.assertion_using_chai(username);
    });
    it('delete user test', async function (){
        await homepage.deletion_of_user();
    });
    it('making sure that user have been deleted', async function (){
        await homepage.search_for_user(username);
        await homepage.assertion_of_deletion();
    });
});