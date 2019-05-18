//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/33b15f0d6187c8e8639febae667c4ebc/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to Weather Service", undefined);
        } else if (body.error) {
            callback("Unable to Find Location", undefined);
        } else {
            callback(
                undefined,
                `${body.daily.data[0].summary}.It is currently ${body.currently.temperature} degrees out.The High today is ${body.daily.data[0].temperatureHigh} degrees and Low is ${body.daily.data[0].temperatureLow} degrees.There is ${body.currently.precipProbability * 100}% chance of rain.`
            );
        }
    });
};

module.exports = forecast;
