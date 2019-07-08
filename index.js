//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// ^^^^ Going to need this stuff pretty much every time ^^^^

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  //console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  //console.log(crypto);
  //var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";
  //var finalURL = baseURL + crypto + fiat;

  var options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body); //<<-------------
    //var price = data.last;
    var price = data.price;
    var currentDate = data.time;
    console.log(price);

    res.write("<p>The current date is " + currentDate + "</p>");

    res.write("<h1>" + amount + " " + crypto + " is currently worth: " + price + " " + fiat + "</h1>");

    res.send();

  // request(finalURL, function(error, response, body){
  //   var data = JSON.parse(body);
  //   var price = data.last;
  //   var currentDate = data.display_timestamp;
  //   console.log(price);
  //
  //   res.write("<p>The current date is " + currentDate + "</p>");
  //
  //   res.write("<h1>The price of " + crypto + " is: " + price + " " + fiat + "</h1>");
  //
  //   res.send();

    //console.log("Weekly average: " + data.averages.week);


  });

});

app.listen(3000, function(){
  console.log("Server is running on Port 3000");
});
