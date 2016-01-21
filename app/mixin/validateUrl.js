'use strict';

var VerEx = require('verbal-expressions');

function isGitHubRepoUrl(TestUrl){
  var rules = VerEx
      .VerEx()
      .startOfLine()
      .maybe('https://')
      .then('github.com/')
      .anythingBut(' ')
      .then('/')
      .anythingBut(' ')
      .endOfLine();

  return !!rules.test(TestUrl);
}

module.exports = isGitHubRepoUrl;