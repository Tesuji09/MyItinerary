// All global variables

let MARKERS = []
let MAP
let GEOCODER
let LOCATION = { lat: 41.8781, lng: -87.6298 }
let SERVICE

// API callback

function getGetGooglePlacesData (searchQuery, callback) {
  const query = {
    location: LOCATION,
    radius: '500',
    query: `${searchQuery}`
  }
  SERVICE.textSearch(query, callback)
}

function getSearchQuery () {
  $('.js-search').submit(event => {
    event.preventDefault()
    getGetGooglePlacesData($(event.target).find('.js-query').val(), renderSidebarResults)
  })
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
    `<div class="result" data-lat="${result.geometry.location.lat()}"
      data-lng="${result.geometry.location.lng()}"
      data-name="${result.name}"
      data-address="${result.formatted_address}"
      data-id="${result.place_id}">
				${result.name}<br>
				${result.formatted_address}<br>
        <input type="button" value="Show Details" id="showDetails">
        <input type="button" value="Add Event" class="addEvent">
		<div>`)
  $('#js-searchResults').html(html)
  appendSideBarResults()
}

function showDetals(place, status){

}
function getResultDetails(id) {
  SERVICE.getDetails({placeId: id}, (place, status) => {
    console.log(place.formatted_phone_number)
    // $(event.target).parent.append(`<div class="details">
    // ${place.formatted_phone_number}
    // <div>`)
  })
}
function appendSideBarResults () {
  $('#addEvent').click(event => {
    event.stopPropagation()
    setMarker($(event.target).parent().data("lat"), $(event.target).parent().data("lng"))
    getResultDetails($(event.target).parent().data("id"))
    addResultAddress()
    addResultName()
    hideSearchContainer()
  })
}

function getLat() {
    return $(event.target).parent().data("lat")
}

function getLng() {
    return $(event.target).parent().data("lng")
}

function addResultAddress () {
    $('.selected .address').val(`${$(event.target).parent().data('address')}`)
}

function addResultName () {
    $('.selected .location').val($(event.target).parent().data('name'))
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
  SERVICE = new google.maps.places.PlacesService(MAP)
}

function searchAddress() {
  $('#submitAddress').click(event => {
    event.preventDefault()
    getAddress()
    console.log("this location " + LOCATION.lng)
  })
}

function searchInitialAddress() {
  $('#initialAddress').click(event => {
    event.preventDefault()
    getAddress()
    $('.introduction').fadeOut(100)
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
    toBottom()
    showSearchContainer()
  })
}
function toBottom() {
  $('.cardContainer').animate({
   scrollTop: $('.cardContainer').height()},
   1400)
}
function showSearchContainer () {
  $('.searchContainer').show()
}

function hideSearchContainer() {
  $('.searchContainer').hide()
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
    console.log('this is working')
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
  searchInitialAddress()
  getSearchQuery()
  createCard()
  searchAddress()
  toggleFullScreen()
  hideFullScreen()
  toggleSidebar()
}

$(showApp())
