function initMap () {
  GEOCODER = new google.maps.Geocoder()
  MAP = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 14,
    mapTypeControl: false,
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
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
  if ($el.find('.details').length  !== 0){
    $el.find('.js-show-details').attr("value", "Show Details")
    $el.find('.details').remove()
  } else{
    $el.append(`<div class="details">
    ${data.website !== undefined ? `<a href="${data.website}" target="_blank">Website</a>`: `No Website Available <br>`}
    ${data.formatted_phone_number !== undefined ? `<p>${data.formatted_phone_number}</p>`: `No Phone Number Available`}
    <p>${data.formatted_address}</p>
    </div>`)
    $el.find('.js-show-details').attr("value", "Hide Details")
  }
}

function getGetGooglePlacesData (searchQuery, callback) {
  const query = {
    location: LOCATION,
    // radius: 20000,
    rankBy: google.maps.places.RankBy.DISTANCE,
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
function createNewMarker(thisLat, thisLng) {
  let marker = new google.maps.Marker({
    position: {lat: thisLat, lng: thisLng},
    map: MAP
  })
  MAP.panTo({lat: thisLat, lng: thisLng})
  MARKERS.push(marker)
  $('.selected').data("markerIndex", MARKERS.length - 1)
  MARKERS[MARKERS.length - 1].setLabel(`${$('.selected').data("cardIndex") + 1}`)
}

function replaceMarker(thisLat, thisLng) {
  let markerIndex = $('.selected').data("markerIndex")
  let marker = new google.maps.Marker({
    position: {lat: thisLat, lng: thisLng},
    map: MAP
  })
  MAP.panTo({lat: thisLat, lng: thisLng})
  MARKERS[markerIndex].setMap(null)
  MARKERS[markerIndex] = marker
  MARKERS[markerIndex].setLabel(`${$('.selected').data("cardIndex") + 1}`)
}

function setMarker (thisLat, thisLng) {
if($('.selected').data('markerIndex') === undefined) {
    createNewMarker(thisLat, thisLng)
 } else {
   replaceMarker(thisLat, thisLng)
 }
  }
