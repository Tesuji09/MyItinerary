const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/search'


function getFourSquareData(callback, searchQuery) {
	const query = {
		client_id: 'LRGCN52GOXN3F3GNBI1CXNZSBUQWSRH4IJGWTO0FGEAZ5AVO',
	    client_secret: 'ITVYE3R0XNXBQOW0RGIBEFFDKHH2ZD0LEFJTAVORDI2ZRDJK',
	    ll: '41.8781,-87.6298',
	    query: `${searchQuery}`,
	    v: '20170801',
	    limit: 20
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


// This section will be for handling sidebar manipulation
function renderSidebarResults (results) {
	let html = results.map(result =>
												`<div class="result">
													<p class="resultName">${result.name}</p>
													<p>${result.contact.formattedPhone}</p>
													<p class="resultAddress">${result.location.address} ${result.location.city}, ${result.location.state} ${result.location.postalCode}</p>
												<div>`);
	$('#js-searchResults').html(html);
	appendSideBarResults();
}

function appendSideBarResults(name, address) {
	$('.result').click(event => {
		event.stopPropagation();
		console.log($(event.target).find(".resultAddress").text());
		addResultAddress();
		addResultName();
	});
}

function addResultAddress() {
	if($(event.target)===$('.result')){
		$('.selected .address').val($(event.target).find(".resultAddress").text())
	}
	else {
		$('.selected .address').val($(event.target).parent().find(".resultAddress").text())
	}
}

function addResultName() {
	if($(event.target)===$('.result')){
		$('.selected .location').val($(event.target).find(".resultName").text())
	}
	else {
		$('.selected .location').val($(event.target).parent().find(".resultName").text())
	}
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

		deSelectCards();
		console.log($('.card').attr("class"));
		$('.cardContainer').append(`<div class="card selected">
										<input class="location" type="text" placeholder="Location"><br>
										<input class="address" type="text" placeholder="Address"><br>
										<label>Start time: <input class="beginTime" type="time"></label><br>
										<label>End time: <input class="endTime" type="time"></label>
										<textarea class='notes'></textarea><br>
										<input type="button" value="Remove Card" class="delete">
									</div>`);
		$('.card').last().data("selected",true)
		deleteCard();
		selectCard();
	});
}

function deleteCard() {
	$('.delete').click(event => {
		const selectedCard = event.target.closest(".card");
		selectedCard.remove();
	});
}

function deSelectCards () {
	$('.card').attr("class", "card notSelected");
}

function selectCard() {
	$('.location, .address, .beginTime, .endTime, .notes').focus(event => {
		deSelectCards();
		$(event.target).closest('.card').attr("class","card selected");
	});
}
// Begin app

function showApp() {
	$('#hideIntro').click( () => {
	$('.introduction').fadeOut(100);
});
getSearchQuery();
createCard()
}

$(showApp())
