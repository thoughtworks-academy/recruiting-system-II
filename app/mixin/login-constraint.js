var constraint = {
  phoneEmail: {
    presence: {message: '^请输入邮箱'},
    email: {message: '^请输入正确的形式'}
  },
  loginPassword: {
    presence: {message: '^请输入密码'},
    length: {
      minimum: 8,
      maximum: 16,
      message: '^密码错误'
    }
  }
};
module.exports = constraint;