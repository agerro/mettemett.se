var express = require('express');
var app = express();

const aws = require("@aws-sdk/client-dynamodb");

const REGION = "eu-west-1"; //e.g. "us-east-1"";
const dynamodbClient = new aws.DynamoDB({ region: REGION });

dynamodbClient.listTables({}, (err, data)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

app.set('view engine', 'ejs');var port = process.env.PORT || 3000;

app.get("/", function(req, res){
    res.render("home");
});

app.get("/bye", function(req, res){
  res.render("bye"); 
});

app.listen(port, function(){
     console.log("server is running on port" + port);});