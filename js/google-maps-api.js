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
    const placeId = $(event.currentTarget).parent().data('id')

    SERVICE.getDetails({ placeId }, showDetails)
  })
}

function showDetails(data) {
  const $el = $(`.js-search-results div[data-id="${ data.place_id }"]`)
  console.log($el.find('.details').length)
  if ($el.find('.details').length  !== 0){
    $el.find('.js-show-details').attr("value", "Show Details")
    $el.find('.details').remove()
  } else{
    $el.append(`<div class="details">
    <p>${data.website}</p>
    <p>${data.formatted_phone_number}</p>
    <p>${data.formatted_address}</p>
    </div>`)
    $el.find('.js-show-details').attr("value", "Hide Details")
  }
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
