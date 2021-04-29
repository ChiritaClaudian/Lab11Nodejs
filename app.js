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

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1',
    'headers': {
        'Host': 'westeurope.tts.speech.microsoft.com',
        'Content-Type': 'application/ssml+xml',
        'Ocp-Apim-Subscription-Key': '896c2ca2f64243fb97221fd1c56f9aa3',
        'X-Microsoft-OutputFormat': 'ogg-16khz-16bit-mono-opus',
        'Connection': 'Keep-Alive'
    },
    body: '<speak version=\'1.0\' xml:lang=\'en-US\'><voice xml:lang=\'en-US\' xml:gender=\'Female\'\r\n    name=\'en-US-AriaNeural\'>\r\n       '+ req.body.textToSpeech + '\r\n</voice></speak>'

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
        res.render('audio.ejs',{
            src: response.body
        })
    });

    

    
})

app.listen(process.env.PORT||3000,console.log('3000'))