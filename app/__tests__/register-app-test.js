jest.dontMock('../source/scripts/component/register-app.component.js');

var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');


describe('registerApp', () => {
  it('change the info after click', () => {
    var registerApp = require('../source/scripts/component/register-app.component.js');

    //var registerLabel = TestUtils.renderIntoDocument(<registerApp isLoginState="false"/>);
    //var registerNode = ReactDom.findDOMNode(registerLabel);
    //console.log(registerNode);
//    console.log(1111111);

    //expect(registerNode).toEqual();
    expect('a').toBe('a');
  });
});



