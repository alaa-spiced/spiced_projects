var myUrl = require('url');
var queryString = require('querystring');

var myUrlObject = myUrl.parse(process.argv[2]); // arguments passed to this module

//querystring.parse(str[, sep[, eq[, options]]])
// str <string> The URL query string to parse
// sep <string> The substring used to delimit key and value pairs in the query string. Default: '&'.
// eq <string>. The substring used to delimit keys and values in the query string. Default: '='.

var myQueryString = queryString.parse(myUrlObject.query);

console.log(
    "The protocol is " + myUrlObject.protocol +
    "\nThe host is " + myUrlObject.host +
    "\nThe hostname is " + myUrlObject.hostname +
    "\nThe port is "+ myUrlObject.port +
    "\nThe pathname is "+ myUrlObject.pathname +
    "\nThe query is " + myUrlObject.query +
    "\nThe value of a parameter is "+ myQueryString['a'] +
    "\nThe value of b parameter is " + myQueryString['b']
);
