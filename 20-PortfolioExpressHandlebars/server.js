const express = require("express");
const app = express();

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

const fs = require("fs");

// const descriptions = require('./descriptions.json');
// console.log(descriptions);
// //Setting up the cookies parser
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
//
// //Setting up the body parser
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//     extended: false
// }));


var projects = fs.readdirSync(__dirname + "/projects", (err, items) => {
  if (err) {
    console.log(err);
    process.exit();
  }
});



app.get("/", (req, res) => {
  res.render('home', {
    layout: "main"
  });
});
// name = carousel

app.get("/:name", (req, res) => {
  const pName = req.params.name;
  console.log(pName);
  // const data = descriptions.name.description;
  // console.log(data);
  res.render("description", {
    layout: "main",
    name: pName
    // description: data
    //    description: data.description
  });
});

app.use(express.static(__dirname + "/projects"));

// app.get('/cookies', function(req, res) {
//   res.send(`
//               <!doctype html>
//               <title>cookies</title>
//               <form method = "POST">
//               <input type = "checkbox" name = "check">
//               <button>Submit</button>
//               </form>
//     `)
//
// });
//
// app.post('/cookies', function(req , res , next) {
//   if (req.body.check) {
//     res.cookie('accepted', true)
//     res.redirect(req.cookies.userUrl)
//   }else {
//     res.redirect('/cookies')
//   }
//
// });

// app.use(function(req, res, next) {
//   if (!req.cookies.accepted && req.url != '/cookies') {
//         res.cookie('userUrl', req.url);
//         res.redirect('/cookies');
//       }else {
//         next();
//       }
//
// });

app.listen(8080, () => {
  console.log("I'm listening again ....");
});
