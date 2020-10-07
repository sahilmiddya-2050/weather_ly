const request = require("postman-request");

function getCoordinate(place, callback) {
  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1Ijoic2FoaWxtaWRkeWEiLCJhIjoiY2tmdjR0YzdmMTNjMjMwdGJxZW94NW16cSJ9.lFl6SzSS7Ajm4N-3hPFNrA`;
  request(geoCodingUrl, { json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location!", undefined);
    } else if (body.features.length === 0) {
      callback("address could not found, try another address", undefined);
    } else {
      const coordinates = body.features[0].center;
      //   const str = "" + coordinates[1] + "," + coordinates[0];
      //   const placeName = body.features[0].place_name;
      const placeDetails = {
        str: "" + coordinates[1] + "," + coordinates[0],
        placeName: body.features[0].place_name,
      };

      callback(undefined, placeDetails);
    }
  });
}

module.exports = getCoordinate;
