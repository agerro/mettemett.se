console.log('Server-side code running');

const express = require('express');
const bodyParser = require('body-parser');
const profanityCheck = require('profanity-check');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

const aws = require("@aws-sdk/client-dynamodb");

const REGION = "eu-west-1"; //e.g. "us-east-1"";
const dynamodbClient = new aws.DynamoDB({ region: REGION });

const multiLanguageFilter = new profanityCheck.Filter({ languages: ["english", "french", "swedish"] })

app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/add", function (req, res) {
    res.render("add");
});

app.get("/search", function (req, res) {
    res.render("search");
});

app.listen(port, function () {
    console.log("server is running on port" + port);
});

app.post('/add_meassurement', bodyParser.json(), (req, res) => {
    console.log("redirected to function add_meassurement");

    var date = new Date();
    var timestamp = date.getTime();

    var item = {
        "meassurement": { "S": "yes" },
        "meassure_date": { "S": String(timestamp) },
        "name": { "S": String(req.body.name) },
        "value": { "S": String(req.body.value) },
        "unit": { "S": String(req.body.unit) }
    }

    let nameSafe = multiLanguageFilter.isProfane(String(String(req.body.name)));
    let valueSafe = multiLanguageFilter.isProfane(String(String(req.body.name)));
    let unitSafe = multiLanguageFilter.isProfane(String(String(req.body.name)));

    if (!nameSafe && !valueSafe && !unitSafe) {
        console.log("safe to proceed");
        dynamodbClient.putItem({
            TableName: 'mettemett',
            Item: item,
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    } else {
        console.log("Profanity found, abort");
    }
});

app.post('/query', (req, res) => {
    console.log("redirected to function query");
    const query = async () => {
        const response = await dynamodbClient
            .query({
                TableName: "mettemett",
                KeyConditionExpression: "#name = :namevalue",
                ExpressionAttributeValues: {
                    ":namevalue": "meassurement",
                },
            })
            .promise();

        console.log(`Query response: ${JSON.stringify(response, null, 2)}`);
    };

    query().catch((error) => console.error(JSON.stringify(error, null, 2)));
});