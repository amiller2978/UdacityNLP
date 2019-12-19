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

const app = express()
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('dist'))
//var to house info sent in request to server url(this is our URL for sentiment)




//console.log(__dirname)


//var for server port
const port = 8081;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
  
})

app.get('/test', function (req, res) {
  
    res.send(JSON.stringify({val1:'test'}))
})

app.get('/test2', function (req, res) {
    //console.log(req.params[0])
    var urlParam = req.query.url;
    //let sentimentURL = req.params[0];
    //let AylienData2 = callSentiment(req.params[0]);
    console.log(urlParam)
    //res.send(AylienData2)
    res.send(JSON.stringify('test message'))
})
 

 function callSentiment(inputURL) {
    
     console.log(`input url: ` + inputURL)

     var sentimentURL = inputURL;

     var getTextSentiment = new Promise(function(resolve, reject) {
    
        console.log(`this is the url just before execute ` + sentimentURL)
        textapi.sentiment({'url': sentimentURL}, function(error, response) {
            if (error === null) {
              
              console.log(response);
              resolve(response)
        
            }
          });
      });

    return getTextSentiment.then(function(value) {
    
    console.log(sentimentURL)
    AylienData=value
    console.log(AylienData)
    //console.log('foo')
    // expected output: "foo"
  });;
}

  app.get('/sendURL:url', analyzeURL )
 
  function analyzeURL(req,res) {
      //console.log(data)
      res.send(req.params.url)
  }


  //var returnSentiment = callSentiment('http://www.wikipedia.com');
  //console.log(returnSentiment)
  console.log('last line')
