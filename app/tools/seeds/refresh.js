var mongoose = require('mongoose');
var userPuzzle = require("../../models/user-puzzle");


mongoose.connect("mongodb://localhost/twars");
db = mongoose.connection;
db.once('open', function() {
    
    userPuzzle.create([
        {
            userId: 1,
            puzzle:[
                {
                    puzzleId: 1,
                    userPuzzleIndex: 1,
                    userAnswer: 1
                },
                {
                    puzzleId: 2,
                    userPuzzleIndex: 4,
                    userAnswer: 4
                }
            ]
        }
    ], function() {
        process.exit();
    });
})