const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const sdk = require("microsoft-cognitiveservices-speech-sdk");

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

//body parser middleware

function synthesizeSpeech(text) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("596ad651d1e64507a5531522b0bd4c38", "westeurope");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput("public/audio.wav");

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
        text,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                return fs.createReadStream("public/audio.wav");
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

app.use(express.urlencoded({
    extended: true
}));

app.get('/',(req,res)=>{
    res.render('home.ejs');

})
function render(){
    console.log("Wainting to download the audio")
}
app.post('/voice',(req,res)=>{
    synthesizeSpeech(req.body.textToSpeech);
    res.render('audio.ejs'); 

})

app.listen(process.env.PORT||3000,console.log('3000'))