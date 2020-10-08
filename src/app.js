const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const getCoordinate = require("./utils/coordinate");
const getWeather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup for using body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "sahil" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "sahil" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "sahil" });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Sahil",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("No place found");
  }
  const place = req.query.address;
  getCoordinate(place, (error, coordinate = {}) => {
    if (error) return res.send({ error });
    getWeather(coordinate.str, (error, status) => {
      if (error) return res.send({ error });
      res.send({ status: status, address: coordinate.placeName });
    });
  });
  console.log(place);
});

// app.post("/weather", async (req, res) => {
//   if (!req.body.address) {
//     return res.send("No place found");
//   }
//   const address = req.body.address;
//   getCoordinate(address, (error, coordinate = {}) => {
//     if (error) return res.send({ error });
//     getWeather(coordinate.str, (error, status) => {
//       if (error) return res.send({ error });
//       res.render("index", { status: status, address: coordinate.placeName });
//     });
//   });
//   console.log(address);
// });

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Sahil",
  });
});

////////////////////////////////////////////////////////////////////////////

// Listening to the server
app.listen(port, () => {
  console.log("server is running" + port);
});
