const express = require('express');
const app = express();
const OpenWeatherMapHelper = require("openweathermap-node");


const helper = new OpenWeatherMapHelper(
	{
		APPID: 'secret',
		units: "metric",
		lang: "en"
	}
);

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    console.log(req.body.zipcode)
    helper.getCurrentWeatherByCityName(req.body.zipcode, (err, currentWeather) => {
        if(err){
            
            res.render('index.ejs', {error: "Invalid zip code"});
        } else {
            res.render('weather.ejs', {temp: currentWeather.main.temp});
        }
    });
    
});

app.listen('80')