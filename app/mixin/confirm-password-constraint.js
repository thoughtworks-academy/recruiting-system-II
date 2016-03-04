'use strict';

var constraint = {
  newPassword: {
    presence: {message: '^请输入新密码'},
    length: {
      minimum: 8,
      maximum: 16,
      message: '^请输入合法新密码'
    }
  },

  confirmPassword: {
    presence: {message: '^请确认新密码'},
    equality: {
      attribute: 'newPassword',
      message: '^两次密码不匹配'
    }
  }
};

module.exports = constraint;