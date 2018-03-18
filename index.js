const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/explore'


function getFourSquareData(callback) {
	const query = {
		client_id:'LRGCN52GOXN3F3GNBI1CXNZSBUQWSRH4IJGWTO0FGEAZ5AVO',
		client_secret:'ITVYE3R0XNXBQOW0RGIBEFFDKHH2ZD0LEFJTAVORDI2ZRDJK',
		v:'20170801',
		ll:`41.8781, -87.6298}`,
		query:'coffee',
		limit:1
	};
	$.getJSON(FOURSQUARE_URL, query, callback);
}

function showData(data) {
	console.log(data);
}


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


 function initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8781, lng: -87.6298 },
          zoom: 10
        });
      }

function showApp() { 
	$('#hideIntro').click( () => {
	$('.introduction').fadeOut(1200);
});
	getFourSquareData(showData)}

$(showApp)   