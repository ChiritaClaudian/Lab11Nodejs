const express = require('express');
const app = express();

const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//body parser middleware
app.use(express.urlencoded({
    extended: true
}));

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.post('/',(req,res)=>{

    var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'westeurope.tts.speech.microsoft.com',
  'path': '/cognitiveservices/v1',
  'headers': {
    'Host': 'westeurope.tts.speech.microsoft.com',
    'Content-Type': 'application/ssml+xml',
    'Ocp-Apim-Subscription-Key': '896c2ca2f64243fb97221fd1c56f9aa3',
    'X-Microsoft-OutputFormat': 'ogg-16khz-16bit-mono-opus',
    'Connection': 'Keep-Alive'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female'\r\n    name='en-US-AriaNeural'>\r\n        "+ req.textToSpeech + "\r\n</voice></speak>";

req.write(postData);

req.end();

    

    res.render('nextpage.ejs',{
        name: req.body.name,
        stuff:req.body.age
    })
})

app.listen(process.env.PORT||3000,console.log('3000'))