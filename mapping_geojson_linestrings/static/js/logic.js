// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// }


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/ghynox/mapping_earthquakes/main/majorAirports.json";
// let torontoData = "https://raw.githubusercontent.com/ghynox/mapping_earthquakes/main/torontoRoutes.json";
let tHoods = "https://raw.githubusercontent.com/ghynox/mapping_earthquakes/main/torontoNeighborhoods.json"
// Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data) 
//   // L.geoJson(data).addTo(map);
// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       // layer.bindPopup();
//       layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");
//     }
//   }).addTo(map);
// });

// Grabbing our GeoJSON data.
d3.json(tHoods).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  color: "blue",
  weight: 1,
  onEachFeature: function (feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
  }
//  {
  // color: "yellow",
  // weight: 2,
  // style: myStyle,
  // onEachFeature: function(feature, layer) {
  //   console.log(layer);
  //     layer.bindPopup("<h2>" + "Airline: " + feature.properties.airline + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
  // }
})
.addTo(map);
});

