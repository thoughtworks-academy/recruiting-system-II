function jumpControl(hasSession){
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
  }]
}
module.exports = jumpControl;