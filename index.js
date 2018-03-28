// All global variables

const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/search'
let MARKERS = []
let MAP
let GEOCODER
let LOCATION = { lat: 41.8781, lng: -87.6298 }

// API callback

function getFourSquareData (callback, searchQuery) {
  const query = {
    client_id: 'LRGCN52GOXN3F3GNBI1CXNZSBUQWSRH4IJGWTO0FGEAZ5AVO',
	    client_secret: 'ITVYE3R0XNXBQOW0RGIBEFFDKHH2ZD0LEFJTAVORDI2ZRDJK',
	    ll: `${LOCATION.lat},${LOCATION.lng}`,
	    query: `${searchQuery}`,
      radius: '10000',
	    v: '20170801',
	    limit: 20
  }
  $.getJSON(FOURSQUARE_URL, query, callback)
}

function getSearchQuery () {
  $('.js-search').submit(event => {
    event.preventDefault()
    getFourSquareData(showData, $(event.target).find('.js-query').val())
  })
}

function showData (data) {
  console.log(data)
  renderSidebarResults(data.response.venues)
}

function setMarker (thisLat, thisLng) {
    console.log(thisLat)
    if(MARKERS.length !== 0) {
      MARKERS[0].setMap(null)
      MARKERS.shift()
      let marker = new google.maps.Marker({
        position: {lat: thisLat, lng: thisLng},
        map: MAP
      })
      MAP.panTo({lat: thisLat, lng: thisLng})
      MARKERS.push(marker)
    } else {
      let marker = new google.maps.Marker({
        position: {lat: thisLat, lng: thisLng},
        map: MAP
      })
      MAP.panTo({lat: thisLat, lng: thisLng})
      MARKERS.push(marker)
    }
}

// This section is for handling sidebar manipulation
function renderSidebarResults (results) {
  let html = results.map(result =>
    `<div class="result" data-lat="${result.location.lat}"
      data-lng="${result.location.lng}"
      data-name="${result.name}"
      data-phone="${result.contact.formattedPhone}"
      data-address="${(result.location.address !== undefined) ? result.location.address : ""}"
      data-city="${result.location.city}"
      data-state="${result.location.state}"
      data-postal="${result.location.postalCode}">
				${result.name}<br>
				${result.contact.formattedPhone}<br>
				${(result.location.address !== undefined) ? result.location.address : ""} ${result.location.city}, ${result.location.state} ${result.location.postalCode}
		<div>`)
  $('#js-searchResults').html(html)
  appendSideBarResults()
}

function appendSideBarResults () {
  $('.result').click(event => {
    event.stopPropagation()
    setMarker($(event.target).data("lat"), $(event.target).data("lng"))
    addResultAddress()
    addResultName()
  })
}

function getLat() {
    return $(event.target).data("lat")
}

function getLng() {
    return $(event.target).data("lng")
}

function addResultAddress () {
    $('.selected .address').val(`${$(event.target).data('address')} ${$(event.target).data('city')}, ${$(event.target).data('state')} ${$(event.target).data('postal')}`)
}

function addResultName () {
    $('.selected .location').val($(event.target).data('name'))
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

function initMap () {
  GEOCODER = new google.maps.Geocoder()
  MAP = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
    mapTypeControl: false
  })
}

function searchAddress() {
  $('#submitAddress').click(event => {
    event.preventDefault()
    getAddress()
    console.log("this location " + LOCATION.lng)
  })
}

function getAddress() {
    console.log($('#address').val())
    GEOCODER.geocode({'address':$('#address').val()}, function(results, status) {
        if (status === 'OK') {
          LOCATION.lat = results[0].geometry.location.lat()
          LOCATION.lng = results[0].geometry.location.lng()
          MAP.setCenter(results[0].geometry.location)
        } else {
          alert('Geocode was not successful for the following reason: ' + status)
        }
    })
}


// This section handles cards

function createCard () {
  $('#create').click(event => {
    deSelectCards()
    $('.cardContainer').append(`<div class="card selected">
      <form>
        <label>Location: <input class="location" type="text" placeholder="Location"></label><br>
				<label>Address: <input class="address" type="text" placeholder="Address"></label><br>
				<label>Start time: <input class="beginTime" type="time"></label><br>
				<label>End time: <input class="endTime" type="time"></label><br>
				<label>Notes<textarea class='notes'></textarea></label><br>
				<input type="button" value="Remove Card" class="delete">
      <form>
        </div>`)
    $('.card').last().data('selected', true)
    deleteCard()
    selectCard()
  })
}

function createFSElement() {
  let elements = []
  for(let i = 0; i < $('.card').length; i++) {
    elements.push(`<div class='event'>
      <h2>${$('.location').eq(i).val()}<h2>
      <p>${$('.address').eq(i).val()}</p>
      <p>Begins at ${$('.beginTime').eq(i).val()}</p
      <p>Ends at ${$('.endTime').eq(i).val()}</p>
      <p>${$('.notes').eq(i).val()}</p>
      </div>`)
  }
  return elements
}

function hideFullScreen() {
  $('.hideStyled').click(event => {$('#styledItinerary').hide()})
}

function toggleFullScreen () {
  $('#showFull').click(event => {
    $('.events').html(createFSElement())
    $('.itinTitle').html(`<h1>${$('#title').val()}</h1>`)
    $('#styledItinerary').show()
  })
}

function deleteCard () {
  $('.delete').click(event => {
    const selectedCard = event.target.closest('.card')
    selectedCard.remove()
  })
}

function toggleSidebar() {
$('.showCC').click(event => {
  $('.cardContainer').toggle('slow')
  })
}

function deSelectCards () {
  $('.card').attr('class', 'card notSelected')
}

function selectCard () {
  $('.location, .address, .beginTime, .endTime, .notes').focus(event => {
    deSelectCards()
    $(event.target).closest('.card').attr('class', 'card selected')
  })
}
// Begin app

function showApp () {
  $('#hideIntro').click(() => {
    $('.introduction').fadeOut(100)
  })
  getSearchQuery()
  createCard()
  searchAddress()
  toggleFullScreen()
  hideFullScreen()
  toggleSidebar()
}

$(showApp())
