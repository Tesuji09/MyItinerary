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
			const searchForm = $(event.currentTarget).find(".js-query");
			console.log(event.currentTarget)
			let searchTerm = searchForm.val();
			console.log(searchTerm)
			getFourSquareData(showData, searchTerm);
	});
}

function showData(data) {
	console.log(data)
	let results = data.response.venues.map(item => {
		return `<li>${item.name}</li>`
	});
	$('#results ul').html(results);
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
MARKERS = [];

function initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8781, lng: -87.6298 },
          zoom: 11
        });
      }

function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
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