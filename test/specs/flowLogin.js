// example of a test group
// note: all tests under the test directory are ran

describe('當使用者進入登入畫面', ()=> {

    it('並且只輸入密嗎或是帳號，並且按下送出，畫面應該要進行報錯', ()=> {
        browser.url('http://webdriver.io')
        browser.getTitle().should.be.equal('WebdriverIO - Selenium 2.0 javascript bindings for nodejs')
    });

    // it('does "What-is-WebdriverIO" link exsist?', ()=> {
    //     browser.url('http://webdriver.io')
    //     browser.getText('#What-is-WebdriverIO').should.be.equal('What is WebdriverIO?')
    // });

    // it('does "What-is-WebdriverIO" link exsist?', ()=> {
    //     browser.url('http://webdriver.io')
    //     browser.click('h1.logo');
    //     browser.getText('#What-is-WebdriverIO').should.be.equal('What is WebdriverIO?')
    // });


    // it('All links should point to an exsiting page', ()=> {
    //     browser.url('http://webdriver.io')
    //     let links = browser.elements('a')

    //     for (let i=0; i < links.value.length; i++) {
    //       let link = links.value[i].ELEMENT,
    //           href = browser.elementIdAttribute(link,'href'),
    //           status = true

    //       console.log(href.value)

    //       fetch(href.value)
    //         .then( function(res){
    //         })
    //         .catch( function(err){
    //           status = false
    //         })

    //       expect(status).to.be.true;
    //     }
    // });
});
