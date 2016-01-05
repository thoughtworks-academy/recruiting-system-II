var constraint = {
  school: {
    presence: {message: '^学校不能为空'},
    format: {
      pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
      message: '^请输入合法学校名称'
    }
  },

  name: {
    presence: {message: '^姓名不能为空'},
    format: {
      pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
      message: '^请输入合法姓名'
    }
  },

  major: {
    presence: {message: '^专业不能为空'},
    format: {
      pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
      message: '^请输入合法专业'
    }
  }
};
module.exports = constraint;