'use strict';

function jumpControl(isLoged, isPaperCommited, isDetailed){
  return [{
    originPath: [
      'user-center.html',
      'programme.html',
      'logic-puzzle.html',
      'progress.html',
      'start.html',
      'dashboard.html'
    ],
    targetPath: '/register.html',
    condition: !isLoged
  },{
    originPath: [
      'logic-puzzle.html',
      'start.html'
    ],
    targetPath: '/dashboard.html',
    condition: isLoged && isPaperCommited && isDetailed
  },{
    originPath: [
      'programme.html',
      'logic-puzzle.html',
      'progress.html',
      'start.html',
      'dashboard.html'
    ],
    targetPath: '/user-center.html',
    condition: isLoged && !isDetailed
  }];
}
module.exports = jumpControl;