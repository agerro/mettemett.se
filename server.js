console.log('Server-side code running');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

const aws = require("@aws-sdk/client-dynamodb");

const REGION = "eu-west-1"; //e.g. "us-east-1"";
const dynamodbClient = new aws.DynamoDB({ region: REGION });

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

app.post('/add_meassurement', (req, res) => {
    console.log("redirected to function add_meassurement");

    dynamodbClient.listTables({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
});

app.post('/load_tables_old', (req, res) => {
    console.log("redirected to function load_tables");
    dynamodbClient.listTables({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
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