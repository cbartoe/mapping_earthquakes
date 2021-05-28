
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
  "Satellite": satelliteStreets
};

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
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
// let tHoods = "https://raw.githubusercontent.com/ghynox/mapping_earthquakes/main/torontoNeighborhoods.json"
let quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
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
d3.json(quakes).then(function(data) {
  console.log(data);

// // Creating a GeoJSON layer with the retrieved data.
// L.geoJson(data, {
//   pointToLayer: function (feature, latlng) {
//     console.log(data);  
//     return L.circleMarker(latlng);
//   }
// })
// .addTo(map);
// });

let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
                },
        style: styleInfo
            }).addTo(map);
});
