var httpRequest = require("request");

const { promisify } = require("util");
const httpRequestP = promisify(httpRequest);

const express = require("express");
const app = express();

const { consumerKey, consumerSecret } = require("./secrets");

var key = consumerKey;
var secret = consumerSecret;
var cat = key + ":" + secret;
var credentials = new Buffer(cat).toString("base64");

const getTokenUrl = "https://api.twitter.com/oauth2/token";
  let getTokenOptions =
    {
      url: getTokenUrl,
      method: "POST",
      headers: {
        Authorization: "Basic " + credentials,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: "grant_type=client_credentials"
    };

   httpRequestP(getTokenOptions).then((val)=> {
     let body = JSON.parse(val.body);
     let access_token = body.access_token;
    const getTweetsUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json";
    const bearerToken = access_token;
    httpRequestP(
      {
        url: getTweetsUrl,
        method: "GET",
        qs: { screen_name: "TheOnion" },
        json: true,
        headers: {
          Authorization: "Bearer " + bearerToken
        }
      }

    ).then((val)=>{
      let xxx = JSON.parse(val);
      console.log(xxx);
    });

  }).catch(function(err) {
  console.log("An error occured when reading path: " + err);
});



// app.listen(8080);
