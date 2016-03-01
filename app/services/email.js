'use strict';
var nodemailer = require("nodemailer");
var yamlConfig = require('node-yaml-config');
var apiServer = yamlConfig.load('./config/config.yml').apiServer;

var emailServer = {

  sendEmail: function () {

    var emailContent = "Hello world <br>  <h1> i am sialvsic </h1>";

    //发送邮件
    var transporter = nodemailer.createTransport({
      service: '163',
      auth: {
        user: 'bjzyxyy@163.com',
        pass: 'lyy68210'
      }

    });

    var mailOptions = {
      from: 'bjzyxyy@163.com', // sender address
      to: 'sialvsic@outlook.com', // list of receivers
      subject: '这是子标题', // Subject line
      html: emailContent // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('邮件发送失败：' + error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });

  }
};

module.exports = emailServer;
