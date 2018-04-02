function renderSidebarResults (results) {

  let html = results.map(result =>
    `<div class="result" data-lat="${result.geometry.location.lat()}"
      data-lng="${result.geometry.location.lng()}"
      data-name="${result.name}"
      data-address="${result.formatted_address}"
      data-id="${result.place_id}">
				${result.name}<br>
        <input type="button" value="Show Details" class="js-show-details">
        <input type="button" value="Add Event" class="js-add-event">
		<div>`)
  $('.js-search-results').html(html)
  console.log('this function is working now')
  appendSideBarResults()
}

function appendSideBarResults () {
  console.log('this is working')
  getPlaceDetails()
  $('.js-add-event').click(event => {
    event.stopPropagation()
    setMarker($(event.target).parent().data("lat"), $(event.target).parent().data("lng"))
    addResultAddress()
    addResultName()
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
