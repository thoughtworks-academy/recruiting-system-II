//'use strict';
//
//var isGitHubRepoUrl = require('../../tools/validateUrl');
//
//describe('isGitHubRepoUrl',function(){
//
//  it('should return true when it is a github repo url',function(){
//    var testUrl = 'https://github.com/simpletrain/pm25-app';
//    expect(isGitHubRepoUrl(testUrl)).toBe(true);
//  });
//
//  it('should return true when it is a github repo url without https',function(){
//    var testUrl = 'github.com/simpletrain/pm25-app';
//    expect(isGitHubRepoUrl(testUrl)).toBe(true);
//  });
//
//  it('should return false when it is not a github repo',function(){
//    var testUrl = 'bustyasianbeauties.com';
//    expect(isGitHubRepoUrl(testUrl)).toBe(false);
//  });
//});