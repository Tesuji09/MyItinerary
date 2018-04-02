function initMap () {
  GEOCODER = new google.maps.Geocoder()
  MAP = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
    mapTypeControl: false
  })
  SERVICE = new google.maps.places.PlacesService(MAP)
}

function getPlaceDetails() {
  $('.js-show-details').click( event => {
    SERVICE.getDetails({placeId: $(event.target).parent().data('id')}, showDetails)
  })
}

function showDetails(data) {
  console.log((`<div class="details">
  <p>${data.website}</p>
  <p>${data.formatted_phone_number}</p>
  <p>${data.formatted_address}</p>`))
}

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
