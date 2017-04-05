/**
 * Created by juancarlosnavarrete on 4/5/17.
 */

var myKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');

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
            }else {
                tweets.reverse(); // Older tweets will be displayed first.
                for (var i in tweets) {
                    console.log(tweets[i].text);

                }
            }
        });
        break;

    case 'spotify-this-song':
        console.log('I want my song');
        var myQuery = process.argv.splice(3).join(' '); // Concatenate the remaining arguments to a single string.

        spotify.search({type: 'track', query: myQuery}, function (error,data) {
            if(error){
                console.log(error);
            }else{
                //lets get artist
                if(data.tracks.items.length){
                    var artist = data.tracks.items[0].artists[0].name;
                    var song = data.tracks.items[0].name;
                    var url = data.tracks.items[0].preview_url;
                    var album = data.tracks.items[0].album.name;

                    console.log(artist);
                    console.log(song);
                    console.log(url);
                    console.log(album);
                }else{
                    console.log('did not find a match');
                    console.log('Ace of Base');
                    console.log('The sign');

                }
            }
        });
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