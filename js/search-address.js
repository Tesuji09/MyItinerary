
function getAddress() {
    GEOCODER.geocode({'address':$('.js-address').val()}, function(results, status) {
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
    $('.js-address').val($('#initial-address').val())
    getAddress()
    $('.intro-page').fadeOut(100)
  })
}

function searchAddress() {
  $('.location-form').submit(event => {
    event.preventDefault()
    getAddress()
  })
}
