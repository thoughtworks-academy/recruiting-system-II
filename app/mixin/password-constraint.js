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
    presence: {message: '^再次确认密码'}
  }
};

module.exports = constraint;