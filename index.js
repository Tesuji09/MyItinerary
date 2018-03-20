const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/search'


function getFourSquareData(callback, searchQuery) {
	const query = {
		client_id: 'LRGCN52GOXN3F3GNBI1CXNZSBUQWSRH4IJGWTO0FGEAZ5AVO',
	    client_secret: 'ITVYE3R0XNXBQOW0RGIBEFFDKHH2ZD0LEFJTAVORDI2ZRDJK',
	    ll: '41.8781,-87.6298',
	    query: `${searchQuery}`,
	    v: '20170801',
	    limit: 5
	};
	$.getJSON(FOURSQUARE_URL, query, callback);
}

function getSearchQuery() {
	$('.js-search').submit(event => {
			event.preventDefault();
			const searchForm = $(event.target).find(".js-query");
			let searchTerm = searchForm.val();
			getFourSquareData(showData, searchTerm);
	});
}

function showData(data) {
	console.log(data)
	const locations = data.response.venues.map(item => {
		let locationLat = item.location.lat
		let locationLng = item.location.lng
		console.log(item.location.lng)
		return {lat: locationLat, lng: locationLng};
	})
	addMarkers(locations);
	renderSidebarResults(data.response.venues);
	//initMap()
}

function renderSidebarResults (results) {
	let html = results.map(result => `<li>${result.name}</li>`);
	$('#results ul').html(html);
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
let MARKERS = [];
let map;
function initMap() {
         	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8781, lng: -87.6298 },
          zoom: 14,
        });
}

function addMarkers(locations) {
					console.log(locations)
					locations.forEach(latlng => {
						console.log(latlng)
	       	let marker = new google.maps.Marker({
	        position: latlng});
					marker.setMap(map); });
      }


// This section handles cards
function createCard() {
	$('#create').click(event => {

		$('.cardContainer').append(`<div class="card">
										<label>Location<input type="text" value="Name of location"></label>
										<label>Address<input type="text" value="Address"></label>
										<textarea rows="4" cols="30"></textarea>
										<input type="button" value="Remove Card" class="delete">
									</div>`);
		deleteCard();
	});
}

function deleteCard() {
	$('.delete').click(event => {
		const selectedCard = event.target.closest(".card");
		selectedCard.remove();
	});
}
// Begin app

function showApp() {
	$('#hideIntro').click( () => {
	$('.introduction').fadeOut(100);
	getSearchQuery();
	createCard();
});
}

$(showApp())
