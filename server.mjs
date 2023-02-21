import { Reply } from "zeromq";
import axios from "axios";

async function runServer() {
  const sock = new Reply();

  await sock.bind("tcp://*:5555");

  var result = await sock.receive(); //socket reception of data
  var string = result.toString();
  var words = string.split(' ')
  const location = words[0]
  const date = words[1]
  console.log(location)
  console.log(date)

  const key = "c0b7bfd571cb4dc78c6174832231202"; // User key to make API calls for weather
  const API =
    "https://api.weatherapi.com/v1/future.json?key=" +
    key +
    "&q=" +
    location +
    "&dt=" +
    date;

  var weather_data = []; // array used to store important weather data

  axios
    .get(API)
    .then((response) => {
      weather_data += //Minimum Temperature Farenheit
        response.data.forecast.forecastday[0].day.mintemp_f + ' ';
      console.log(response.data.forecast.forecastday[0].day.mintemp_f);
      
      weather_data += //Maximum Temperature Farenheit
        response.data.forecast.forecastday[0].day.maxtemp_f + ' ';
      console.log(response.data.forecast.forecastday[0].day.maxtemp_f);
      
      weather_data += //Average Temperature Farenheit
        response.data.forecast.forecastday[0].day.avgtemp_f + ' ';
      console.log(response.data.forecast.forecastday[0].day.avgtemp_f);
      
      weather_data += //Total Precipitation
        response.data.forecast.forecastday[0].day.totalprecip_in + ' ';
      console.log(response.data.forecast.forecastday[0].day.totalprecip_in);
      
      sock.send(weather_data) //send weather data as response
      console.log(weather_data);
    })
    .catch((error) => {
      console.log(error);
    });
}

runServer();
