
function getAddress() {
    console.log($('.address').val())
    GEOCODER.geocode({'address':$('.address').val()}, function(results, status) {
        if (status === 'OK') {
          LOCATION.lat = results[0].geometry.location.lat()
          LOCATION.lng = results[0].geometry.location.lng()
          MAP.setCenter(results[0].geometry.location)
        } else {
          console.log('Geocode was not successful for the following reason: ' + status)
        }
    })
}

function searchInitialAddress() {
  $('#js-submit-initial-address').click(event => {
    event.preventDefault()
    getAddress()
    $('.introduction').fadeOut(100)
  })
}

function searchAddress() {
  $('#submit-address').click(event => {
    event.preventDefault()
    getAddress()
    console.log("this location " + LOCATION.lng)
  })
}
