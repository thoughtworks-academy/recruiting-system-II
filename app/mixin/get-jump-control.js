function jumpControl(hasSession, isCommited){
  return [{
    originPath: [
      "account.html",
      "dojo.html",
      "logic-puzzle.html",
      "progress.html",
      "start.html"
    ],
    targetPath: '/',
    condition: !hasSession
  },{
    originPath: [
      "logic-puzzle.html",
      "start.html"
    ],
    targetPath: 'http://localhost:3000/dashboard.html',
    condition: hasSession && isCommited
  }]
}
module.exports = jumpControl;