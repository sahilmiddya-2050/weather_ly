console.log("gvcsgdvhgv");

const getWeatherBotton = document.getElementById("get-weather");
const weatherReport = document.getElementById("weather-report");

getWeatherBotton.addEventListener("click", (e) => {
  e.preventDefault();
  const address = e.target.previousElementSibling.value;
  console.log(e.target.previousElementSibling.value);
  weatherReport.innerText = "Loading...";
  fetch(`http://localhost:3000/weather?address=${address}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      weatherReport.innerText = data.address;
      e.target.previousElementSibling.value = "";
      console.log(data);
    });
});
