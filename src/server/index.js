//support for .env vars
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

///support for alyien API
var AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

let AylienData = {};
//consider moving port to .env and then client can read it
let port = 3000
const app = express()
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('dist'))
//console.log(__dirname)


app.listen(port, function () {
    console.log(`App listening on port:` + port)
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})



app.post('/getSentiment', function (request, response) {
    let inputURL = request.body.input.url;
    console.log(request.body.input.url);
    textapi.sentiment({
        url: `${inputURL}`
    }, function (error, response) {
        if (error === null) {
            AylienData['polarity'] = response.polarity;
            AylienData['subjectivity'] = response.subjectivity;
            AylienData['polarity_confidence'] = response.polarity_confidence;
            AylienData['subjectivity_confidence'] = response.subjectivity_confidence;
            return AylienData;
        }
    });
    response.send(AylienData);
});


  console.log('last line')
