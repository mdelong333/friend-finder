var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        //get new user input
        var newFriendRatings = req.body.ratings;

        //function to return each item in the ratings array as an integer
        var ratings = newFriendRatings.map(function(x) {
            return parseInt(x, 10);
        });

        var newFriendData = {
            name: req.body.name,
            photo: req.body.photoLink,
            ratings: req.body.ratings
        };

        // //reduce ratings to single value
        // var ratingSum = ratings.reduce((a,b) => a + b, 0);
        
        console.log(newFriendRatings);
        console.log(newFriendData);
        // console.log(ratingSum);

        //compare new user input with all other friend ratings
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);

            for (var r = 0; r < newFriendRatings.length; r++) {
                
                var difference = Math.abs(friends[i].ratings[r] - newFriendRatings[r]);

                console.log(difference);
            }
        }

        friends.push(req.body);

        res.json({reqBody: req.body});
    });
};