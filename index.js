// All global variables

let MARKERS = []
let MAP
let GEOCODER
let LOCATION = { lat: 41.8781, lng: -87.6298 }
let SERVICE

// API callback



// This section is for handling sidebar manipulation


// This section will be for handling the map

// function getLat() {
// 	navigator.geolocation.getCurrentPosition(position => {
// 		return position.coords.latitude;
// 	});
// }

// function getLng() {
// 	navigator.geolocation.getCurrentPosition(position => {
// 		return position.coords.longitude;
// 	});
// }





// This section handles cards

// Begin app

function showApp () {
  searchInitialAddress()
  getSearchQuery()
  createCard()
  searchAddress()
  toggleFullScreen()
  hideFullScreen()
  toggleOnClick()
}

$(showApp())
