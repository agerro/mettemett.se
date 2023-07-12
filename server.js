console.log('Server-side code running');

var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

const aws = require("@aws-sdk/client-dynamodb");

const REGION = "eu-west-1"; //e.g. "us-east-1"";
const dynamodbClient = new aws.DynamoDB({ region: REGION });

app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.get("/", function(req, res){
    res.render("home");
});

app.get("/bye", function(req, res){
  res.render("bye"); 
});

app.listen(port, function(){
     console.log("server is running on port" + port);
});

app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log("redirected to function clicked");
  
    dynamodbClient.listTables({}, (err, data)=>{
        if(err) {
            console.log(err);
        } else {
            console.log(data.TableNames);
        }
    });
  });