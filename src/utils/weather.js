const request = require("postman-request");

const API_KEY = "38e9fa3d5c4ee233912330f4ff368da2";

function getWeather(coordinateStr, callback) {
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${coordinateStr}`;
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location!", undefined);
    } else if (body.error) {
      callback("Please specify a valid location identifier", undefined);
    } else {
      const data = body.current;
      const status = {
        observation_time: data.observation_time,
        temperature: data.temperature,
        weather_descriptions: data.weather_descriptions,
        wind_speed: data.wind_speed,
        wind_degree: data.wind_degree,
        wind_dir: data.wind_dir,
        pressure: data.pressure,
        precip: data.precip,
        humidity: data.humidity,
        cloudcover: data.cloudcover,
        feelslike: data.feelslike,
        uv_index: data.uv_index,
        visibility: data.visibility,
      };
      callback(undefined, status);
    }
  });
}

module.exports = getWeather;
