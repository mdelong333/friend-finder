var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        //get new user input parse/return integer as ratings values
        var newFriendRatings = req.body.ratings.map(function(x) {
            return parseInt(x, 10);
        });

        var newFriendData = {
            name: req.body.name,
            photo: req.body.imageLink,
            ratings: newFriendRatings
        };
        
        console.log(newFriendRatings);
        console.log(newFriendData);

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 50
        };

        //compare new user input with all other friend ratings
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);

            var difference = [];

            for (var r = 0; r < newFriendRatings.length; r++) {
                
                friendDif = Math.abs(friends[i].ratings[r] - newFriendRatings[r]);

                //push rating differences into an array
                difference.push(friendDif);
                
            };

            console.log(difference);

            //get total difference value
            var totalDiff = difference.reduce((a, b) => a + b, 0);
            console.log(totalDiff);
            
            if (totalDiff <= bestMatch.friendDifference) {

                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].imageLink;
                bestMatch.friendDifference = totalDiff;

            };
        };

        console.log(bestMatch);
        friends.push(newFriendData);

        res.json(bestMatch);
    });
};