module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    staging: {
      servers: 'vagrant@192.168.33.10',
      workspace: '/tmp/release',
      dirToCopy: 'app',
      deployTo: '/home/vagrant/works/twice/app',
      repositoryUrl: 'git@github.com:thoughtworks-academy/recruiting-system.git'
    }
  });
};