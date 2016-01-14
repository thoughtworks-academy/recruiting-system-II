'use strict';

var constraint = {
  oldPassword: {
    presence: {message: '^请输入旧密码'},
    length: {
      minimum: 8,
      maximum: 16,
      message: '^请输入合法旧密码'
    }
  },

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
      attribute: 'password',
      message: '两次密码不匹配'
    }
  }
};

module.exports = constraint;