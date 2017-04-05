/**
 * Created by juancarlosnavarrete on 4/5/17.
 */

var myKeys = require('./keys.js');
var Twitter = require('twitter');

// console.log(myKeys);
// console.log(myKeys.twitterKeys.consumer_key);



// liri can accept the following arguments my-tweets, spotify-this-song, movie-this, do-what-it-says


switch (process.argv[2]){
    case 'my-tweets':
        /***
         * In case 'my-tweets' the switch statement makes a get request to Twitter's API and retrieves
         * user's tweets.
         * @type {Twitter}
         */
        var client = new Twitter({
            consumer_key: myKeys.twitterKeys.consumer_key,
            consumer_secret: myKeys.twitterKeys.consumer_secret,
            access_token_key: myKeys.twitterKeys.access_token_key,
            access_token_secret: myKeys.twitterKeys.access_token_secret
        })

        client.get('statuses/user_timeline', function (error, tweets, response) {
            if(error){
                console.log(error);
            }
            tweets.reverse(); // Older tweets will be displayed first.
            for( var i in tweets){
                console.log(tweets[i].text);

            }
        });
        break;

    case 'spotify-this-song':
        console.log('I want my song');


        break;
    case 'movie-this':
        console.log('I want my movie');
        break;
    case 'do-what-it-says':
        console.log('just do it');
        break;
    default:
        console.log('Unknown Command. Please try again.');
}