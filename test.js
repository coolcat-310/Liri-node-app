/**
 * Created by juancarlosnavarrete on 4/5/17.
 */

//REQUIRED PACKAGES
var myKeys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var imdb = require('imdb-api');
var fs = require('fs');
var colors = require('colors');

switch (process.argv[2]){
    /***
     * A Switch statement that compares the third argument with the given five cases.
     * params: string
     */
    case 'my-tweets':
        getMyTweets();
        break;

    case 'spotify-this-song':
        getMySong(process.argv.slice(3).join(' '));
        break;

    case 'movie-this':
        getMyMovie(process.argv.slice(3).join(' '));
        break;

    case 'do-what-it-says':
        getMyNotes();
        break;

    default:
        console.log('Unknown Command. Please try again.'.underline.red);
}


function getMyNotes(){
    /***
     * The function 'getMyNotes' reads the contents in 'random.txt' as argument
     * pairs and runs if the function exists otherwise a a message displays with
     * an error.
     */
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if(err){
            console.log(err);
        }else {
            var commands = data.split(",");

            if(commands[0] === 'my-tweets'){
                getMyTweets();
            }else if(commands[0] === 'movie-this'){
                getMyMovie(commands[1].replace(/^'(.*)"$/, '$1'));
            }else if(commands[0] === 'spotify-this-song'){
                getMySong(commands[1].replace(/^'(.*)"$/, '$1'));
            }else{
                console.log('Unknown Command. Please try again.'.underline.red);
            }
        }
    });
}

function getMyMovie(myMovie){
    /***
     * The function 'getMyMovie' searches through the API and returns information based on the
     * argument, 'myMovie'.
     * params myMovie: string
     */
    imdb.getReq({ name: myMovie }, function(err, movie) {
        if(err){
            console.log('Did not find your Movie, so here is Neo!!!'.underline.red);
            getMyMovie('Matrix');

        }else {
            //title
            console.log('Movie Title: '.blue + movie.title);
            //year
            console.log('Release Date: '.blue + movie.released);
            //rating imdb
            console.log('Movie Rating: '.blue  + movie.rating[0]);
            //Country
            console.log('Country origin: '.blue + movie.country);
            //Language
            console.log('Language: '.blue + movie.language);
            //Plot
            console.log('Plot: '.blue + movie.plot);
            //Actors
            console.log('Cast: '.blue + movie.actors);
            //rating rotten
            console.log('Rotten rating: '.blue + movie.rating[1]);
            //rotten tomatoes url
            console.log('URL: '.blue + movie.imdburl);


            logMessage('Movie', movie);
        }
    });
}

function getMySong(song){
    /***
     * The function 'getMySong' searches through the API and returns information based on the
     * argument, 'song'.
     * params song: string
     */
    spotify.search({type: 'track', query: song}, function (error,data) {
        if(error){
            console.log(error);
        }else{
            if(data.tracks.items.length){
                var artist = data.tracks.items[0].artists[0].name;
                var song = data.tracks.items[0].name;
                var url = data.tracks.items[0].preview_url;
                var album = data.tracks.items[0].album.name;

                console.log('Artist: '.blue + artist);
                console.log('Song: '.blue + song);
                console.log('URL: '.blue + url);
                console.log('Album: '.blue + album);

                logMessage('Song', data.tracks.items[0]);
            }else{
                console.log('Did not find a match, How about some Ace of Base?'.underline.red);
                getMySong('Ace of Base');

            }
        }
    });
}


function getMyTweets(){
    /***
     * In function 'getMyTweets' makes a get request to Twitter's API and retrieves
     * user's tweets. P.S my tweets are FABULOUS!!!!!
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
                console.log(tweets[i].text.rainbow);

            }
            logMessage('Tweet', tweets);
        }
    });
}

function logMessage(arg, message){
    /***
     * In function 'logMessage' produces a string with all the properties that are contain in the argument 'message'.
     * The string is then appended to a text file (log.txt).
     * params: arg (str)
     * params: message (object/array)
     */
    switch (arg){
        case 'Movie':
            var text = '\n-------------------\nTitle:\t' + message.title + '\nDate:\t' + message.released +
                    '\nMovie Rating:\t' + message.rating[0] + '\nCountry origin:\t' + message.country +
                    '\nLanguage:\t' + message.language + '\nPlot:\t' + message.plot + '\nCast:\t' + message.actors +
                    '\nRotten Rating:\t' + message.rating[1] + '\nURL:\t' + message.imdburl +
                    '\n---------------------';
            fs.appendFile('log.txt', text);
            break;

        case 'Song':
            var text = '\n-------------------\nArtist:\t' + message.artists[0].name + '\nSong:\t' + message.name +
                '\nURL:\t' + message.preview_url + '\nAlbum:\t' + message.album.name +
                '\n---------------------';
            fs.appendFile('log.txt', text);
            break;

        case 'Tweet':
            var text = '\n-------------------\n';
            for( var i in message){
                text += 'Tweet:\t' + message[i].text + '\n';
            }
            text += '-------------------';
            fs.appendFile('log.txt', text);
            break;

        default:
            console.log('Argument not found.')

    }

}

